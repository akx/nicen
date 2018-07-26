const resolveHandler = require('./handlers/resolve');

const process = async (req, res) => {
  const body = { width: 120, content: '', ...req.body };
  const handler = resolveHandler(body.language, body.handler);
  if (handler.error) {
    return res.status(400).json(handler.error);
  }
  let done = false;
  const t0 = +new Date();
  setTimeout(() => {
    if (!done) {
      res.status(400).json({ error: 'timed out' });
    }
  }, 5000);
  try {
    const { content, width } = body;
    const resp = await handler.process({ content, width });
    const time = (+new Date()) - t0;
    if (!done) {
      done = true;
      res.json({ ...resp, handler: handler.name, language: handler.language, time });
    }
  } catch (error) {
    console.error(error);
    const time = (+new Date()) - t0;
    if (!done) {
      done = true;
      res.status(500).json({ error, handler: handler.name, language: handler.language, time });
    }
  }
};
module.exports = process;
