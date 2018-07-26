const handlers = require('./handlers');

const process = async (req, res) => {
  const {language, content, width} = {width: 120, ...req.body};
  const languageHandlers =
      handlers.filter((handler) => handler.language === language);
  if (languageHandlers.length === 0) {
    return res.status(400).json({
      error: `no handlers for language ${language}`,
      language,
    });
  }
  const handler = languageHandlers[0];
  let done = false;
  setTimeout(() => {
    if (!done) {
      res.status(400).json({error: 'timed out'});
    }
  }, 5000);
  try {
    const resp = await handler.process({content, width});

    if (!done) {
      done = true;
      res.json({...resp, name: handler.name, language});
    }
  } catch (error) {
    console.error(error);
    if (!done) {
      done = true;
      res.status(500).json({error});
    }
  }
};
module.exports = process;