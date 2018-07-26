const handlers = require('./handlers');

const process = async (req, res) => {
  const {language, handler: handlerName, content, width} = {width: 120, ...req.body};
  const languageHandlers =
      handlers.filter((handler) => handler.language === language);
  if (languageHandlers.length === 0) {
    return res.status(400).json({
      error: `no handlers for language ${language}`,
      language,
    });
  }
  let handler;
  if (handlerName) {
    handler = handlers.filter((handler) => handler.name === handlerName);
  } else {
    handler = languageHandlers[0];
  }
  if (!handler) {
    const handlerNames = handlers.map((handler) => handler.name);
    return res.status(400).json({
      error: `no handler ${handlerName} for language ${language}; try one of ${handlerNames.join(', ')}`,
      language,
      handlerNames,
    });
  }
  let done = false;
  const t0 = +new Date();
  setTimeout(() => {
    if (!done) {
      res.status(400).json({error: 'timed out'});
    }
  }, 5000);
  try {
    const resp = await handler.process({content, width});
    const time = (+new Date()) - t0;

    if (!done) {
      done = true;
      res.json({...resp, handler: handler.name, language, time});
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