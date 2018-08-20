const {NICEN_PY_URL} = require('../config');
const consultLanguageServer = require('../util/consultLanguageServer');

module.exports = {
  language: 'html',
  name: 'bs4',
  async process({content, width}) {
    return await consultLanguageServer(
      `${NICEN_PY_URL}bs4`,
      content,
      {width},
    );
  }
};
