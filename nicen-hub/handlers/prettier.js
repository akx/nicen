const { NICEN_JS_URL } = require('../config');
const consultLanguageServer = require('../util/consultLanguageServer');

module.exports = [
  {
    language: 'javascript',
    name: 'prettier-js',
    async process({ content, width }) {
      return await consultLanguageServer(
        `${NICEN_JS_URL}prettier`,
        content,
        { width },
      );
    }
  },
  {
    language: 'css',
    name: 'prettier-css',
    async process({ content, width }) {
      return await consultLanguageServer(
        `${NICEN_JS_URL}prettier`,
        content,
        { width, qs: { parser: 'postcss' } },
      );
    }
  },
];
