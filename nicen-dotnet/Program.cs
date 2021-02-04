using System;

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
