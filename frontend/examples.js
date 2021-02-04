/* eslint-disable no-tabs */
// via https://wiki.python.org/moin/SimplePrograms
const EXAMPLE_PYTHON = `
BOARD_SIZE=8
class BailOut(Exception):
  pass
def validate(queens):
  left=right=col=queens[-1]
  for r in reversed(  queens[:-1]  ):
       left,right = (left-1,right+1)
       if r in(left, col, right):raise BailOut
def add_queen(queens):
    for i in range(BOARD_SIZE):
      test_queens=queens+[i]
      try:
        validate(test_queens)
        if len(test_queens) == BOARD_SIZE: return test_queens
        else: return add_queen(test_queens)
      except BailOut: pass
    raise BailOut

queens = add_queen([]);
print(queens);print("\\n".join(". "*q + "Q " + ". "*(BOARD_SIZE-q-1) for q in queens))
`;

// via https://www.ioccc.org/2018/burton1/prog.c
const EXAMPLE_C = `
char O,o[];main(l){for(;~l;O||puts(o))O=(O[o]=~(l=getchar())?4<(4^l>>5)?l:46:0)?-~O&printf("%02x ",l)*5:!O;}
`;

// via prettier.io/playground
const EXAMPLE_JAVASCRIPT = `
function HelloWorld({greeting = "hello", greeted = '"World"', silent = false, onMouseOver,}) {

  if(!greeting){return null};

     // TODO: Don't use random in render
  let num = Math.floor (Math.random() * 1E+7).toString().replace(/\\.\\d+/ig, "")

  return <div className='HelloWorld' title={\`You are visitor number \${ num }\`} onMouseOver={onMouseOver}>

    <strong>{ greeting.slice( 0, 1 ).toUpperCase() + greeting.slice(1).toLowerCase() }</strong>
    {greeting.endsWith(",") ? " " : <span style={{color: '\\grey'}}>", "</span> }
    <em>
	{ greeted }
	</em>
    { (silent)
      ? "."
      : "!"}

    </div>;

}
`;

// via https://gist.github.com/mhs/166727
const EXAMPLE_CSS = `
  #content_wrap .universal_form form fieldset ol { list-style: none; }
              #content_wrap .universal_form form fieldset ol li.buttons { margin:1em 0 0 160px }
  #content_wrap .universal_form form legend,
    #content_wrap .universal_form h4 {
      font-size:1.6em;padding:0 0 1em 0;font-weight: bold;
      font-family:'Lucida Sans',Lucida Grande, sans-serif;
    }
`;

// via https://doc.rust-lang.org/rust-by-example/
const EXAMPLE_RUST = `
#![allow(unreachable_code)]

fn main() { 'outer: loop {
            println!("Entered the outer loop");
        'inner: loop {
          println!("Entered the inner loop");
            break 'outer;
        }println!("This point will never be reached");
    }println!("Exited the outer loop");
    let n = 5;if n < 0 {print!("{} is negative", n);} else
    if n > 0 {print!("{} is positive", n);} else {print!("{} is zero", n);}
}
`;

// via https://github.com/prettier/plugin-php
const EXAMPLE_PHP = `
<?php
array_map(function($arg1,$arg2) use ( $var1, $var2 ) {
    return $arg1+$arg2/($var+$var2);
}, array("complex"=>"code","with"=>"inconsistent","formatting"=>"is", "hard" => "to", "maintain"=>true));
`;

const EXAMPLE_MARKDOWN = `
  # hello world
    
  this is an example
    
  * foo
    * bar
`;

const EXAMPLE_JSON = '{"ugly":"json","var":[1,2,3,4,5,\'foo\']}';

// via https://blog.risingstack.com/graphql-overview-getting-started-with-graphql-and-nodejs/
const EXAMPLE_GRAPHQL = `{
  user(id: 1  ) {
    name age
    friends {name            image
      age
      
    }
  }
}`;

const EXAMPLE_TYPESCRIPT = `
interface X<V>{i: number,o:{i:any,p:V}};;;
type XN = X<number>; class Foo{private static y: XN;}
`;

// Via https://wiki.postgresql.org/wiki/Mandelbrot_set
const EXAMPLE_SQL = `WITH RECURSIVE x(i) AS ( VALUES(0) UNION ALL SELECT i + 1 FROM x WHERE i < 101 ), Z(Ix, Iy, Cx, 
Cy, X, Y, I) AS ( SELECT Ix, Iy, X::FLOAT, Y::FLOAT, X::FLOAT, Y::FLOAT, 0 FROM (SELECT -2.2 + 0.031 * i, i FROM x) 
AS xgen(x,ix) CROSS JOIN (SELECT -1.5 + 0.031 * i, i FROM x) AS ygen(y,iy) UNION ALL SELECT Ix, Iy, Cx, Cy, X * X - 
Y * Y + Cx AS X, Y * X * 2 + Cy, I + 1 FROM Z WHERE X * X + Y * Y < 16.0 AND I < 27 ), Zt (Ix, Iy, I) AS ( SELECT Ix,
Iy, MAX(I) AS I FROM Z GROUP BY Iy, Ix ORDER BY Iy, Ix ) SELECT array_to_string(array_agg( SUBSTRING(
' .,,,-----++++%%%%@@@@#### ', GREATEST(I,1), 1 ) ),'' ) FROM Zt GROUP BY Iy ORDER BY Iy;
`;

const EXAMPLE_CSHARP = `public class Customer 
{public Name Name {get;set;}
void foo() {
for(;;){Console   .WriteLine   ("hello",x:"bar");
}
}
}`;

const EXAMPLE_XML = `
<note><to>Tove</to><from              email="jani@example.com">Jani</from><heading>Reminder
</heading><body>Don't forget me this weekend!</body>
</note>`;

const EXAMPLE_HTML = `
<ul>
<li>hello
<li>world
</ul>
`;

const EXAMPLE_JAVA = `
package de.blau.refactormycode;

import java.util.ArrayList;
import java.util.List;

public class UglyPoker {
	public boolean doCompareHC(String p1, String p2, String p3, String p4, String p5) {
		String hc = "s02";
		List<String> o = new ArrayList<String>();
		o.add(p1);		o.add(p2);	o.add(p3);o.add(p4);	o.add(p5);
m.add(card1);		m.add(card2);		m.add(card3);
m.add(card4);		m.add(card5);

for (int i = 0; i < o.size();i++) {			String mc = m.get(i);
  for (int j = 0; j < o.size(); j++) {
    String oc = m.get(j);
    if (Integer.valueOf(oc.substring(1)) > Integer.valueOf(mc.substring(1))) {					if (Integer.valueOf(oc.substring(1)) > Integer.valueOf(hc.substring(1))) {
        hc = oc;
      }
    } else {					if (Integer.valueOf(mc.substring(1)) > Integer.valueOf(hc.substring(1))) {
        hc = mc;
      }
    }			}		}return m.contains(hc);
	}
}
`;

const EXAMPLE_RUBY = `
#date: 03/24/2005
#title: Pretty numbers
#author: Vincent Foley
#email: vfoley at gmail dot com
        d=[30644250780,9003106878,
    30636278846,66641217692,4501790980,
 671_24_603036,131_61973916,66_606629_920,
   30642677916,30643069058];a,s=[],$*[0]
      s.each_byte{|b|a<<("%036b"%d[b.
         chr.to_i]).scan(/\\d{6}/)}
          a.transpose.each{ |a|
            a.join.each_byte{\\
             |i|print i==49?\\
               ($*[1]||"#")\\
                 :32.chr}
                   puts
                    }`;

export default {
  c: EXAMPLE_C,
  csharp: EXAMPLE_CSHARP,
  css: EXAMPLE_CSS,
  graphql: EXAMPLE_GRAPHQL,
  html: EXAMPLE_HTML,
  java: EXAMPLE_JAVA,
  javascript: EXAMPLE_JAVASCRIPT,
  json: EXAMPLE_JSON,
  markdown: EXAMPLE_MARKDOWN,
  php: EXAMPLE_PHP,
  python: EXAMPLE_PYTHON,
  ruby: EXAMPLE_RUBY,
  rust: EXAMPLE_RUST,
  sql: EXAMPLE_SQL,
  typescript: EXAMPLE_TYPESCRIPT,
  xml: EXAMPLE_XML,
};
