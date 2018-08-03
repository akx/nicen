const {NICEN_DOTNET_URL} = require('../config');
const consultLanguageServer = require('../util/consultLanguageServer');

module.exports = {
  language: 'csharp',
  name: 'roslyn',
  async process({content, width}) {
    return await consultLanguageServer(
      `${NICEN_DOTNET_URL}csharp`,
      content,
      {width},
    );
  }
};
