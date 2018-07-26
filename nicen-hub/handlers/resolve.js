const handlers = require('.');

const resolveHandler = (language, handlerName) => {
  const handlersList = (
    language ?
      handlers.filter((handler) => handler.language.toLowerCase() === language.toLowerCase()) :
      handlers
  );
  if (handlerName) {  // Handler requested by name
    const handler = handlersList.find((h) => h.name.toLowerCase() === handlerName.toLowerCase());
    if (!handler) {
      const handlerNames = handlers.map((handler) => handler.name);
      return {
        error: (
          (language ? `no handler ${handlerName} for language ${language}` : `no handler ${handlerName}`) +
          (handlerNames.length ? `; try one of ${handlerNames.join(', ')}` : '')
        ),
        handler: handlerName,
        language,
      };
    }
    return handler;
  }
  if (!language) {
    return {
      error: 'no language specified',
    };
  }

  if (handlersList.length === 0) {
    return {
      error: `no handlers for language ${language}`,
      language,
    }
  }
  return handlersList[0];
};

module.exports = resolveHandler;
