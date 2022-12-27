function sort(list, condition = (a, b) => a > b) {
  const arr = list.slice();

  for (let i = 1; i < arr.length; i++) {
    let sorted = i - 1;
    
    while (sorted > -1 && (condition(arr[sorted], arr[sorted + 1]))) {
      [arr[sorted], arr[sorted + 1]] = [arr[sorted + 1], arr[sorted]]; 
      sorted--;
    }
  }
  
  return arr;
}

const list = new Array(10000).fill(0).map((_, i) => Math.random() * i);

console.time();
console.log(sort(list))
console.timeEnd();