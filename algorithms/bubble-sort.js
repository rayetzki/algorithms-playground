function sort(list, condition = (a, b) => a > b) {
  const arr = list.slice();
  
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (condition(arr[j], arr[j + 1])) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  } 
  
  return arr;
}

const list = new Array(10000).fill(0).map((_, i) => Math.random() * i);

console.time();
console.log(sort(list))
console.timeEnd();