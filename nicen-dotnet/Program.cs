using System;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.CSharp.Formatting;
using Microsoft.CodeAnalysis.Formatting;
using Microsoft.CodeAnalysis.Options;
using System.Net;
using System.Threading;

namespace nicen_dotnet
{
    class Program
    {
        static void Main(string[] args)
        {
            var port = 31095;
            var portString = Environment.GetEnvironmentVariable("NICEN_DOTNET_PORT");
            if(!String.IsNullOrWhiteSpace(portString)) {
                port = int.Parse(portString);
            }
            var s = new Server(port);
            s.Run();
        }
    }
}
