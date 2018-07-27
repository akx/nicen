import m from 'mithril';
import './style.css';
import logoSvg from '../assets/logo.svg';

function post() {
  fetch('/', {
    method: 'POST',
    body: JSON.stringify({
      language: state.language,
      content: state.content,
      width: state.width,
    }),
    headers: {
      'content-type': 'application/json',
    }
  })
    .then(resp => resp.json())
    .then(data => {
      state.result = data;
      m.redraw();
    });
}

const state = {
  language: 'python',
  width: 120,
  content: `
movies = {"title":["Mission: Impossible - Fallout"], "genres":["Action", "Adventure", "Thriller"], 'storyline':[' \\n  Ethan Hunt and his IMF team, along with some familiar allies, race against time after a mission gone wrong.    \\n ']}
print(dict((k, list(map(str.strip, v))) for k,v in movies.items()))
`,
  result: null,
};

const outputView = () => {
  const className = [];
  const { result } = state;
  let message;
  if (result) {
    if (result.error) {
      className.push('error');
    }
    if (result.content) {
      className.push('success');
    }
    const mData = { ...result };
    delete mData.content;
    message = mData.error || JSON.stringify(mData, null, 1).replace(/\n/g, ' ');
  }
  return (
    <section id="output" class={className.join(' ')}>
      <div id="message">{message}</div>
      <div id="code">{result && result.content ? result.content : null}</div>
    </section>
  );
};

const inputView = () => (
  <form id="input" method="post" onsubmit={(event) => {
    post();
    event.preventDefault();
    return false;
  }}>
    <div id="controls">
      <select name="language" value={state.language} onchange={(event) => {
        state.language = event.target.value;
      }}>
        <option value="python">Python</option>
        <option value="c">C</option>
        <option value="javascript">JavaScript</option>
      </select>
      <input type="number" title="print width" name="width" value={state.width} min={0} onchange={(event) => {
        state.width = 0 | event.target.valueAsNumber;
      }} />
    </div>
    <textarea name="content" oninput={(event) => {
      state.content = event.target.value;
    }}>{state.content}</textarea>
    <button type="submit">Nicen my code!</button>
  </form>
);

const view = () => [
  <nav>
    <img src={logoSvg} alt="Nicen" />
  </nav>,
  <main>
    {inputView()}
    {state.result ? outputView() : null}
  </main>,
  <footer>
    An <a href="https://akx.github.io/">@akx</a> joint.
    &middot;&nbsp;<a href="/openapi.yaml">OpenAPI Spec</a>
    &nbsp;&middot;&nbsp;<a href="https://github.com/akx/nicen">Source code</a>
  </footer>,
];


m.mount(document.body, { view });
