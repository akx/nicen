const request = require('request-promise-native');

const consultLanguageServer = async function(url, content, {width}) {
  const resp = await request({
    method: 'post',
    uri: url,
    qs: {width},
    body: content,
    headers: {
      'Content-type': 'text/plain',
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
};

module.exports = consultLanguageServer;