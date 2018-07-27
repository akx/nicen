/* eslint-env browser */
import React from 'react';
import logoSvg from '../assets/logo.svg';
import InputView from './InputView';
import OutputView from './OutputView';

const EXAMPLE_PYTHON = `
movies = {"title":["Mission: Impossible - Fallout"], "genres":["Action", "Adventure", "Thriller"], 'storyline':['
\\n  Ethan Hunt and his IMF team, along with some familiar allies, race against time after a mission gone wrong.    \\n ']}
print(dict((k, list(map(str.strip, v))) for k,v in movies.items()))
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'python',
      width: 120,
      content: EXAMPLE_PYTHON,
      result: null,
    };
  }

  post = (event) => {
    const { language, content, width } = this.state;
    fetch('/', {
      method: 'POST',
      body: JSON.stringify({
        language,
        content,
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
      case 'language':
        this.setState({ language: value });
        break;
      default:
    }
  };

  render() {
    const { language, content, width, result } = this.state;
    return (
      <React.Fragment>
        <nav>
          <img src={logoSvg} alt="Nicen" />
        </nav>
        <main>
          <InputView
            code={content}
            language={language}
            width={width}
            onSubmit={this.post}
            onChange={this.onChange}
          />
          {result ? <OutputView result={result} /> : null}
        </main>
        <footer>
          An <a href="https://akx.github.io/">@akx</a> joint. &middot;&nbsp;<a href="/openapi.yaml">
            OpenAPI Spec
          </a>
          &nbsp;&middot;&nbsp;<a href="https://github.com/akx/nicen">Source code</a>
        </footer>
      </React.Fragment>
    );
  }
}
