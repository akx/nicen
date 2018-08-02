const {NICEN_JS_URL} = require('../config');
const consultLanguageServer = require('../util/consultLanguageServer');

module.exports = {
  language: 'sql',
  name: 'sql-formatter',
  async process({content, width}) {
    return await consultLanguageServer(
      `${NICEN_JS_URL}sql-formatter`,
      content,
      {width},
    );
  }
};
