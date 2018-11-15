const { NICEN_JS_URL } = require('../config');
const consultLanguageServer = require('../util/consultLanguageServer');

const consultPrettierServer = (content, width, options = {}) => (
  consultLanguageServer(
    `${NICEN_JS_URL}prettier`,
    content,
    { width, ...options },
  )
);

const prettierMode = (language) => (
  {
    language,
    name: `prettier-${language}`,
    process: ({ content, width }) => consultPrettierServer(content, width, { qs: { parser: language } }),
  }
);

module.exports = [
  {
    language: 'javascript',
    name: 'prettier-js',
    process: ({ content, width }) => consultPrettierServer(content, width),
  },
  prettierMode('css'),
  prettierMode('php'),
  prettierMode('typescript'),
  prettierMode('graphql'),
  prettierMode('markdown'),
  prettierMode('json'),
  prettierMode('java'),
];
