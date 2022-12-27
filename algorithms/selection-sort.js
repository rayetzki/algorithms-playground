function sort(list, condition = (a, b) => a > b) {
  const arr = list.slice();

  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    
    for (let j = i; j < arr.length; j++) {
      if (condition(arr[minIndex], arr[j])) {
        minIndex = j;
      }

      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      }
    }
  }

  return arr;
}

const list = new Array(10000).fill(0).map((_, i) => Math.random() * i);

console.time();
console.log(sort(list))
console.timeEnd();