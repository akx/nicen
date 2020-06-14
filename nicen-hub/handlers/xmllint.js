const consultLanguageServer = require('../util/consultLanguageServer');
const {NICEN_NATIVE_URL} = require('../config');

module.exports = {
  language: 'xml',
  name: 'xmllint',
  async process({ content, width }) {
    return await consultLanguageServer(
      `${NICEN_NATIVE_URL}xmllint`,
      content,
      { width },
    );
  },
};
