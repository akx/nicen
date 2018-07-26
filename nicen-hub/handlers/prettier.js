const {NICEN_JS_URL} = require('../config');
const consultLanguageServer = require('../util/consultLanguageServer');

module.exports = {
  language: 'javascript',
  name: 'prettier',
  async process({content, width}) {
    return await consultLanguageServer(
      `${NICEN_JS_URL}prettier`,
      content,
      {width},
    );
  }
};
