function binarySearch(list, element) {
  let left = -1;
  let right = list.length;

  while (right - left > 1) {
    const middle = Math.floor((left + right) / 2);
    
    if (list[middle] === element) {
      return list[middle];
    } else if (list[middle] > element) {
      right = middle;
    } else {
      left = middle;
    }

    return -1;
  }
}

module.exports = binarySearch;