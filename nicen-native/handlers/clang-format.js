const pipe = require('../pipe');

module.exports = {
  language: 'c',
  name: 'clang-format',
  async process({ content, width }) {
    const resp = await pipe('/usr/bin/env', ['clang-format', '-assume-filename=program.c'], content);
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
