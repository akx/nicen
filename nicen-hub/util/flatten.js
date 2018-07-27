function flattenInto(outArray, array) {
  array.forEach((el) => {
    if(Array.isArray(el)) {
      flattenInto(outArray, el);
    } else {
      outArray.push(el);
    }
  });
  return outArray;
};

function flatten(array) {
  return flattenInto([], array);
}

module.exports = flatten;
