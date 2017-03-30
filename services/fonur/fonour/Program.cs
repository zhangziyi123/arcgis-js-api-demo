using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

namespace fonour
{
    public class Program
    {
        //Asp.Net Core应用程序默认提供IIS服务和Kestrel服务两种寄宿方式，
        //意味着Asp.Net Core应用程序可以脱离IIS运行，这也是跨平台的基础。
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .UseApplicationInsights()
                .Build();

            host.Run();
        }
    }
}
