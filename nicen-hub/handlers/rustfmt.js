const consultLanguageServer = require('../util/consultLanguageServer');
const {NICEN_NATIVE_URL} = require('../config');

module.exports = {
  language: 'rust',
  name: 'rustfmt',
  async process({ content, width }) {
    return await consultLanguageServer(
      `${NICEN_NATIVE_URL}rustfmt`,
      content,
      { width },
    );
  },
};
