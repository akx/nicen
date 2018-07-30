/* eslint-env browser */
import React from 'react';
import logoSvg from '../assets/logo.svg';
import InputView from './InputView';
import OutputView from './OutputView';

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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handler: null,
      width: 120,
      content: EXAMPLE_PYTHON,
      result: null,
      handlers: null,
    };
  }

  componentDidMount() {
    fetch('/handlers', { method: 'GET' })
      .then((res) => res.json())
      .then((handlers) => {
        const handler = handlers.find(h => h.name === 'black' && h.language === 'python');
        this.setState({ handlers, handler });
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to load handler list. Try again soon.');
      });
  }

  post = (event) => {
    const { content, handler, width } = this.state;
    fetch('/', {
      method: 'POST',
      body: JSON.stringify({
        content,
        handler: handler.name,
        language: handler.language,
        width,
      }),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(result => {
        this.setState({ result });
      });
    event.preventDefault();
    return false;
  };

  onChange = (prop, value) => {
    switch (prop) {
      case 'code':
        this.setState({ content: value });
        break;
      case 'width':
        this.setState({ width: value });
        break;
      case 'handler':
        this.setState({ handler: value });
        break;
      default:
    }
  };

  render() {
    const { handler, content, width, result, handlers } = this.state;
    if (handlers === null) return null;
    return (
      <React.Fragment>
        <nav>
          <img src={logoSvg} alt="Nicen" />
        </nav>
        <main>
          <InputView
            handlers={handlers}
            code={content}
            handler={handler}
            width={width}
            onSubmit={this.post}
            onChange={this.onChange}
          />
          {result ? <OutputView result={result} /> : null}
        </main>
        <footer>
          An <a href="https://akx.github.io/">@akx</a> joint. &middot;&nbsp;
          <a href="/openapi.yaml">OpenAPI Spec</a>
          &nbsp;&middot;&nbsp;<a href="https://github.com/akx/nicen">Source code</a>
        </footer>
      </React.Fragment>
    );
  }
}
