const body = require('body-parser');
const express = require('express');
const stripAnsi = require('strip-ansi');
const util = require('util');

const port = parseInt(process.env.NICEN_NATIVE_PORT, 10) || 62090;
const app = express();

async function runProcessor(processor, req, res) {
  try {
    const result = await processor.process({
      content: req.body,
      width: parseInt(req.query.width || '120', 10),
    });
    if (result.content) {
      return res.status(200).send(result.content);
    }
    if (result.error) {
      throw new Error(result.error);
    }
  } catch (err) {
    res.status(400).send(stripAnsi(err.toString()));
  }
}

app.use(body.text());

const handlers = {
  "/clang-format": require('./handlers/clang-format'),
  "/rustfmt": require('./handlers/rustfmt'),
  "/xmllint": require('./handlers/xmllint'),
}

Object.entries(handlers).forEach(([path, handler]) => app.post(path, async (req, res) => {
  await runProcessor(handler, req, res);
}));

app.listen(port, '0', (err) => {
  if (err) throw err;
  console.log(`[nicen-native] listening on port ${port}`);
});
