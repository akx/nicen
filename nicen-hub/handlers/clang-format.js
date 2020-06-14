const consultLanguageServer = require('../util/consultLanguageServer');
const {NICEN_NATIVE_URL} = require('../config');

module.exports = {
  language: 'c',
  name: 'clang-format',
  async process({ content, width }) {
    return await consultLanguageServer(
      `${NICEN_NATIVE_URL}clang-format`,
      content,
      { width },
    );
  },
};
