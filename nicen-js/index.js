const express = require('express');
const body = require('body-parser');
const prettier = require('prettier');
const util = require('util');
const stripAnsi = require('strip-ansi');


const config = require('../nicen-hub/config');

const app = express();

app.use(body.text());
app.post('/prettier', (req, res) => {
  const code = req.body;
  try {
    const formatted = prettier.format(code, {
      semi: true,
      parser: (req.query.parser || 'babylon'),
      printWidth: parseInt(req.query.width || '120', 10),
      trailingComma: 'all',
    });
    res.status(200).send(formatted);
  } catch (err) {
    res.status(400).send(stripAnsi(err.toString()));
  }
});

app.listen(config.NICEN_JS_PORT, config.NICEN_JS_HOST, (err) => {
  if (err) throw err;
  console.log(`[nicen-js] listening on ${config.NICEN_JS_HOST}:${config.NICEN_JS_PORT}`);
});
