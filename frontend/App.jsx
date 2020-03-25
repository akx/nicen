/* eslint-env browser */
import React from 'react';
import logoSvg from '../assets/logo.svg';
import InputView from './InputView';
import OutputView from './OutputView';
import examples from './examples';

const WIDTH_STORAGE_KEY = 'nicenWidth';
const HANDLER_STORAGE_KEY = 'nicenHandler';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      handler: null,
      handlers: null,
      result: null,
      width: parseInt(localStorage.getItem(WIDTH_STORAGE_KEY), 10) || 120,
      hasCustomContent: false,
    };
  }

  componentDidMount() {
    fetch('/handlers', { method: 'GET' })
      .then((res) => res.json())
      .then((handlers) => {
        this.setState({ handlers }, () => {
          const lastUsedHandler = localStorage.getItem(HANDLER_STORAGE_KEY);
          const handler =
            handlers.find((h) => h.name === lastUsedHandler) ||
            handlers.find((h) => h.name === 'black' && h.language === 'python');
          this.onChange('handler', handler);
        });
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
      .then((resp) => resp.json())
      .then((result) => {
        this.setState({ result });
      });
    event.preventDefault();
    return false;
  };

  onChange = (prop, value) => {
    switch (prop) {
      case 'code':
        this.setState({ content: value, hasCustomContent: value.trim() !== '' });
        break;
      case 'width':
        this.setState({ width: value });
        localStorage.setItem(WIDTH_STORAGE_KEY, value);
        break;
      case 'handler':
        {
          const handler = value;
          const { hasCustomContent } = this.state;
          let { content } = this.state;
          content = (!hasCustomContent ? examples[handler.language] : null) || content;
          this.setState({ handler, content });
          localStorage.setItem(HANDLER_STORAGE_KEY, handler.name);
        }
        break;
      default:
    }
  };

  render() {
    const { handler, content, width, result, handlers } = this.state;
    if (handlers === null) return null;
    return (
      <>
        <nav>
          <img src={logoSvg} alt="Nicen" />
          <div className="about">
            An <a href="https://akx.github.io/">@akx</a> joint. &middot;&nbsp;
            <a href="/openapi.yaml">OpenAPI Spec</a>
            &nbsp;&middot;&nbsp;<a href="https://github.com/akx/nicen">Source code</a>
          </div>
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
          {result ? <OutputView result={result} handler={handler} /> : null}
        </main>
      </>
    );
  }
}
