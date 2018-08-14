const pipe = require('../util/pipe');

module.exports = {
  language: 'xml',
  name: 'xmllint',
  async process({ content, width }) {
    // TODO: xmllint does not honor width
    const resp = await pipe('/usr/bin/env', ['xmllint', '--format', '--nonet', '--recover', '-'], content);
    if (resp.code !== 0) {
      return {
        error: resp.stderr.toString(),
      };
    }
    return {
      content: resp.stdout.toString(),
    };
  }
};
