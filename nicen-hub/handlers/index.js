const flatten = require('../util/flatten');

const handlers = flatten([
  require('./black'),
  require('./autopep8'),
  require('./clang-format'),
  require('./prettier'),
]);

module.exports = handlers;
