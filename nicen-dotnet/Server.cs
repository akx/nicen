using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Text;
using System.Threading;
using System.Web;
using Newtonsoft.Json;

namespace nicen_dotnet
{
    class Server
    {
        private readonly int port;
        public Server(int port)
        {
            this.port = port;
        }
        public void Run()
        {
            var server = new HttpListener();
            server.Prefixes.Add("http://*:" + port.ToString() + "/");
            Console.WriteLine("nicen-dotnet: listening on " + port.ToString());
            server.Start();
            while (true)
            {
                try
                {
                    var context = server.GetContext();
                    ThreadPool.QueueUserWorkItem(delegate
                    {
                        ProcessRequestWrapped(context);
                    });
                }
                catch (Exception ex)
                {
                    Console.Error.Write(ex);
                }
            }
        }

        private void ProcessRequestWrapped(HttpListenerContext context)
        {
            Console.Write(String.Format("{0} {1} -> ", context.Request.HttpMethod, context.Request.Url));
            try
            {
                ProcessRequest(context);
            }
            catch (Exception e)
            {
                context.Response.StatusCode = 400;
                context.Response.Close(Encoding.UTF8.GetBytes(e.ToString()), true);
            }
            finally
            {
                Console.WriteLine(String.Format("{0}", context.Response.StatusCode));
            }
        }

        private void ProcessRequest(HttpListenerContext context)
        {
            if (context.Request.Url.LocalPath == "/csharp")
            {
                ProcessCSharpRequest(context);
                return;
            }
            context.Response.StatusCode = 404;
            context.Response.Close(Encoding.UTF8.GetBytes("404 :("), true);
        }

        private void ProcessCSharpRequest(HttpListenerContext context)
        {
            var timer = new Stopwatch();
            timer.Start();
            string body = "";
            if (context.Request.HasEntityBody)
            {
                using (var reader = new StreamReader(context.Request.InputStream, Encoding.UTF8))
                {
                    body = reader.ReadToEnd();
                }
                body = Reformatter.ReformatCSharp(body);
            }
            timer.Stop();
            context.Response.Headers.Add("X-Duration", timer.Elapsed.TotalSeconds.ToString());
            context.Response.StatusCode = 200;
            context.Response.Close(Encoding.UTF8.GetBytes(body), true);
        }
    }
}
