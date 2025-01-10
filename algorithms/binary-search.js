const binarySearch = (list, element) => {
  let left = 0, right = list.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    
    if (list[middle] === element) {
      return middle;
    } else if (list[middle] < element) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}

export default binarySearch;