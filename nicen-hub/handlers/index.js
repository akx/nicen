const flatten = require('../util/flatten');

const handlers = flatten([
  require('./black'),
  require('./autopep8'),
  require('./clang-format'),
  require('./prettier'),
  require('./rustfmt'),
  require('./sql-formatter'),
  require('./dotnet'),
  require('./xmllint'),
]);

module.exports = handlers;
