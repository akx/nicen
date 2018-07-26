import m from 'mithril';
import './style.css';

function post() {
  const form = this;
  fetch('/', {
    method: 'POST',
    body: new FormData(form)
  })
    .then(resp => resp.json())
    .then(data => {
      const out = document.getElementById('output');
      out.classList.toggle('error', !!data.error);
      out.classList.toggle('success', !!data.content);
      document.getElementById('code').innerText = data.content || '';
      delete data.content;
      document.getElementById('message').innerText = data.error || JSON.stringify(data);
    });
  return false;
}

const content = `
movies = {"title":["Mission: Impossible - Fallout"], "genres":["Action", "Adventure", "Thriller"], 'storyline':[' \\n  Ethan Hunt and his IMF team, along with some familiar allies, race against time after a mission gone wrong.    \\n ']}
print(dict((k, list(map(str.strip, v))) for k,v in movies.items()))
`;

const view = () => (
  <main>
    <h1>Nicen</h1>
    <a href="/openapi.yaml">OpenAPI Spec</a>
    <table width="100%">
      <tr>
        <td>
          <form method="post" onsubmit={post}>
            <select name="language">
              <option value="python">Python</option>
              <option value="c">C</option>
              <option value="javascript">JavaScript</option>
            </select>
            <textarea name="content">{content}</textarea>
            <input type="submit" value="nicen" />
          </form>
        </td>
        <td id="output">
          <div id="message" />
          <div id="code" />
        </td>
      </tr>
    </table>
  </main>
);


m.mount(document.body, { view });
