const pipe = require('../util/pipe');

module.exports = {
  language: 'rust',
  name: 'rustfmt',
  async process({ content, width }) {
    // TODO: rustfmt does not honor width yet
    const resp = await pipe('/usr/bin/env', ['rustfmt'], content);
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
