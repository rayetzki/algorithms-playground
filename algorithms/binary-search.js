function binarySearch(list, element) {
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

const list = new Array(100).fill(0).map((_, i) => Math.random() * i);

console.time();
console.log(binarySearch(list, list.at(-1)));
console.timeEnd();