function splitArrayIntoChunks(array, chunkSize) {
  let result = [];

  chunkSize = parseInt(chunkSize);
  if (!isNaN(chunkSize) && chunkSize > 0) {
    for (let i = 0, j = array.length; i < j; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
  }
  return result;
}

module.exports = { splitArrayIntoChunks }
