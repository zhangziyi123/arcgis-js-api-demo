<%@ WebHandler Language="C#" Class="proxy" %>
/*
  This proxy page does not have any security checks. It is highly recommended
  that a user deploying this proxy page on their web server, add appropriate
  security checks, for example checking request path, username/password, target
  url, etc.
*/
using System;
using System.Drawing;
using System.IO;
using System.Web;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;
using System.Web.Caching;

/// <summary>
/// Forwards requests to an ArcGIS Server REST resource. Uses information in
/// the proxy.config file to determine properties of the server.
/// </summary>
public class proxy : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        HttpResponse response = context.Response;

        // Get the URL requested by the client (take the entire querystring at once
        //  to handle the case of the URL itself containing querystring parameters)
        string uri = context.Request.Url.Query.Substring(1);
        int index1 = uri.IndexOf("?");
        int index2 = uri.IndexOf("&");
        
        if (index1 < 0 && index2 >= 0)
        {
            StringBuilder sb = new StringBuilder(uri);
            sb.Replace("&", "?", index2, 1);
            uri = sb.ToString();
        }

        System.Net.HttpWebRequest req = (System.Net.HttpWebRequest)System.Net.HttpWebRequest.Create(uri);
        req.Method = context.Request.HttpMethod;
        req.ServicePoint.Expect100Continue = false;
        req.Referer = context.Request.Headers["referer"];
        req.Proxy = null;

        string cookie = context.Request.Headers["Cookie"];
        req.Headers.Add("Cookie:" + cookie);

        #region POST方式
        // Set body of request for POST requests
        if (context.Request.InputStream.Length > 0)
        {
            byte[] bytes = new byte[context.Request.InputStream.Length];
            context.Request.InputStream.Read(bytes, 0, (int)context.Request.InputStream.Length);
            req.ContentLength = bytes.Length;

            string ctype = context.Request.ContentType;
            if (String.IsNullOrEmpty(ctype))
            {
                req.ContentType = "application/x-www-form-urlencoded";
            }
            else
            {
                req.ContentType = ctype;
            }

            try
            {
                using (Stream outputStream = req.GetRequestStream())
                {
                    outputStream.Write(bytes, 0, bytes.Length);
                }
            }
            catch (Exception ex)
            {
            }
        }
        #endregion

        // Send the request to the server
        System.Net.WebResponse serverResponse = null;
        try
        {
            serverResponse = req.GetResponse();
        }
        catch (System.Net.WebException webExc)
        {
            response.StatusCode = 500;
            response.StatusDescription = webExc.Status.ToString();
            response.Write(webExc.Response);
            response.End();
            return;
        }

        // Set up the response to the client
        if (serverResponse != null)
        {
            response.ContentType = serverResponse.ContentType;
            using (Stream byteStream = serverResponse.GetResponseStream())
            {

                // Text response
                if (serverResponse.ContentType.Contains("text") ||
                    serverResponse.ContentType.Contains("json") ||
                    serverResponse.ContentType.Contains("xml"))
                {
                    using (StreamReader sr = new StreamReader(byteStream))
                    {
                        string strResponse = sr.ReadToEnd();
                        response.Write(strResponse);
                    }
                }
                else
                {
                    // Binary response (image, lyr file, other binary file)
                    BinaryReader br = new BinaryReader(byteStream);
                    byte[] outb = br.ReadBytes((int)serverResponse.ContentLength);
                    br.Close();

                    // Tell client not to cache the image since it's dynamic
                    response.CacheControl = "no-cache";

                    // Send the image to the client
                    // (Note: if large images/files sent, could modify this to send in chunks)
                    response.OutputStream.Write(outb, 0, outb.Length);
                }

                serverResponse.Close();
            }
        }
        response.End();
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}

