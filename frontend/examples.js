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

export default {
  c: EXAMPLE_C,
  javascript: EXAMPLE_JAVASCRIPT,
  python: EXAMPLE_PYTHON,
  css: EXAMPLE_CSS,
  rust: EXAMPLE_RUST,
};
