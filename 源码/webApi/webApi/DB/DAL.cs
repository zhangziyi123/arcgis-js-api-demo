using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.OleDb;
using System.Data;
namespace webApi.DB
{
    public class DAL
    {
    }
    public class SqlHelper {
        public static readonly string connStr = ConfigurationManager.ConnectionStrings["connStr"].ConnectionString;
        public static DataTable GetDataTable(string sql,CommandType type,params OleDbParameter[]pars) {
            using (OleDbConnection conn = new OleDbConnection(connStr))
            {
                using (OleDbDataAdapter apter = new OleDbDataAdapter(sql, conn))
                {
                    if (pars != null)
                    {
                        apter.SelectCommand.Parameters.AddRange(pars);
                    }
                    apter.SelectCommand.CommandType = type;
                    DataTable dt = new DataTable();
                    apter.Fill(dt);
                    return dt;
                }
            
            }
                           
        }

        public static int ExecuteNonquery(string sql, CommandType type, params OleDbParameter[] pars)
        {
            using (OleDbConnection conn = new OleDbConnection(connStr))
            {
                using (OleDbCommand cmd = new OleDbCommand(sql, conn))
                {
                    if (pars != null)
                    {
                        cmd.Parameters.AddRange(pars);
                    }
                    cmd.CommandType = type;
                    conn.Open();                               
                    return cmd.ExecuteNonQuery();
              
                }
            }
        }
    }



   // public class BlogInfosDal {

   //     public string errstr = "";
   //     /// <summary>
   //     /// 获取Blog数据列表
   //     /// </summary>
   //     /// <returns></returns>
   //     public List<Blog> GetList()
   //     {
   //         string sqlstr = "select * from Blogs";
   //         DataTable dt = SqlHelper.GetDataTable(sqlstr,CommandType.Text);
   //         List<Blog> list = null;
   //         if (dt.Rows.Count > 0)
   //         {
   //             list = new List<Blog>();
   //             Blog blog = null;
   //             foreach (DataRow row in dt.Rows)
   //             {
   //                 blog = new Blog();
   //                 //将row中的数据赋值给blog中的属性
   //                 LoadEntity(blog,row);
   //                 list.Add(blog);
   //             }
   //         }
   //         return list; 
   //     }
   //     private void LoadEntity(Blog blog,DataRow row) {
   //         blog.BlogId = Convert.ToInt32(row["BlogId"]);
   //         blog.CId = Convert.ToInt32(row["CId"]);
   //         blog.title = row["title"] != DBNull.Value ? row["title"].ToString() : string.Empty;
   //         blog.time = Convert.ToDateTime(row["time"] != DBNull.Value ? row["time"].ToString() : string.Empty);
   //         blog.content =row["content"] != DBNull.Value ? row["content"].ToString() : string.Empty;
   //         blog.summary = row["summary"] != DBNull.Value ? row["summary"].ToString() : string.Empty;

   //     }
   //     /// <summary>
   //     /// 添加Bolg信息
   //     /// </summary>
   //     /// <param name="blog"></param>
   //     /// <returns></returns>
   //     public int AddBlogInfo(Blog blog)
   //     {
           
   //         string sql = "insert into Blogs ([CId],[title],[time],[content],[summary]) values (@CId,@title,@time,@content,@summary)";
   //         //OleDbParameter[] pars = { 
   //         //                new OleDbParameter("@CId",OleDbType.BigInt),
   //         //                new OleDbParameter("@title",OleDbType.VarChar),
   //         //                new OleDbParameter("@time",OleDbType.Date),
   //         //                new OleDbParameter("@content",OleDbType.VarChar),
   //         //                new OleDbParameter("@summary",OleDbType.VarChar) };
            
   //         //pars[0].CId = blog.CId;
   //         //pars[1].title = blog.title;
   //         //pars[2].time = blog.time;
   //         //pars[3].content = blog.content;
   //         //pars[4].summary = blog.summary;
   //         OleDbParameter[] pars = {
   //                      new OleDbParameter("@CId",blog.CId),
   //                      new OleDbParameter("@title",blog.title),
   //                       new OleDbParameter("@time",blog.time),
   //                      new OleDbParameter("@content",blog.content),
   //                      new OleDbParameter("@summary",blog.summary)                      
   //             };
   //         return SqlHelper.ExecuteNonquery(sql,CommandType.Text,pars);

   //     }

   //     /// <summary>
   //     /// 修改Bolg信息
   //     /// </summary>
   //     /// <param name="blog"></param>
   //     /// <returns></returns>
   //     public int UpdataBlogInfo(Blog blog)
   //     {
   /////给参数赋值时一定要注意参数的顺序如下：如果先赋值BlogId会出错
   //         string sql = "update Blogs SET CId=@CId,[title]=@title,[time]=@time,[content]=@content,[summary]=@summary where BlogId=@BlogId";    
   //         OleDbParameter[] pars = {
   //                                     // new OleDbParameter("@id",blog.BlogId)
   //                      new OleDbParameter("@CId",blog.CId),
   //                      new OleDbParameter("@title",blog.title),
   //                      new OleDbParameter("@time",blog.time),
   //                      new OleDbParameter("@content",blog.content),                     
   //                      new OleDbParameter("@summary",blog.summary),
   //                      new OleDbParameter("@BlogId",blog.BlogId)
   //             };
   //         return SqlHelper.ExecuteNonquery(sql, CommandType.Text, pars);

   //     }

   //     /// <summary>
   //     /// 删除Bolg信息
   //     /// </summary>
   //     /// <param name="blog"></param>
   //     /// <returns></returns>
   //     public int DelteBlogInfo(int id)
   //     {
   //         string sql = "delete from Blogs where BlogId=@id";
   //         OleDbParameter[] par = {new OleDbParameter("@id", id)};
   //         return SqlHelper.ExecuteNonquery(sql, CommandType.Text, par);

   //     }

   // }

}