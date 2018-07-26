const {NICEN_PY_URL} = require('../config');
const consultLanguageServer = require('../util/consultLanguageServer');

module.exports = {
  language: 'python',
  name: 'autopep8',
  async process({content, width}) {
    return await consultLanguageServer(
      `${NICEN_PY_URL}autopep8`,
      content,
      {width},
    );
  }
};
