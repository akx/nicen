using System;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.CSharp.Formatting;
using Microsoft.CodeAnalysis.Formatting;
using Microsoft.CodeAnalysis.Options;
using System.IO;

namespace nicen_dotnet
{
    class Reformatter
    {
        public static string ReformatCSharp(string input)
        {
            var ws = new AdhocWorkspace();
            SyntaxTree tree = CSharpSyntaxTree.ParseText(input);
            var options = ws.Options;
            options = options.WithChangedOption(CSharpFormattingOptions.IndentBlock, true);
            options = options.WithChangedOption(CSharpFormattingOptions.NewLinesForBracesInMethods, true);
            options = options.WithChangedOption(CSharpFormattingOptions.NewLinesForBracesInTypes, true);
            options = options.WithChangedOption(CSharpFormattingOptions.WrappingPreserveSingleLine, false);
            options = options.WithChangedOption(CSharpFormattingOptions.WrappingKeepStatementsOnSingleLine, false);
            SyntaxNode formattedNode = Formatter.Format(tree.GetRoot(), ws, options);
            var w = new StringWriter();
            formattedNode.WriteTo(w);
            return w.ToString();
        }
    }
}
