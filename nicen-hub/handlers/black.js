const request = require('request-promise-native');
const {NICEN_PY_URL} = require('../config');

module.exports = {
  language: 'python',
  name: 'black',
  async process({content, width}) {
    const resp = await request({
      method: 'post',
      uri: `${NICEN_PY_URL}black`,
      qs: {width},
      body: content,
      headers: {
        'Content-type': 'text/python',
      },
      resolveWithFullResponse: true,
    });
    if (resp.statusCode === 200) {
      return {
        content: resp.body,
      };
    }
    return {
      error: resp.body || resp.statusMessage,
    };
  }
};