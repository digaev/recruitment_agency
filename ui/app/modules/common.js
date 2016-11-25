function splitArrayIntoChunks(array, chunkSize) {
  const sz = parseInt(chunkSize, 10);
  const result = [];

  if (!isNaN(sz) && sz > 0) {
    for (let i = 0, j = array.length; i < j; i += sz) {
      result.push(array.slice(i, i + sz));
    }
  }
  return result;
}

export {
  splitArrayIntoChunks, // eslint-disable-line import/prefer-default-export
};
