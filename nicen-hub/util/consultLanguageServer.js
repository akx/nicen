const request = require('request-promise-native');

const consultLanguageServer = async function (url, content, { width, qs }) {
  let resp;
  try {
    resp = await request({
      method: 'post',
      uri: url,
      qs: { ...(qs || {}), width },
      body: content,
      headers: {
        'Content-type': 'text/plain',
      },
      resolveWithFullResponse: true,
      simple: false,
    });
  } catch (err) {
    return {
      error: `Unable to consult language server: ${err}`,
    };
  }
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
