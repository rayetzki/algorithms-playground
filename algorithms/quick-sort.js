function sort(list) {
  if (list.length <= 1) return list;

  const arr = list.slice();
  const pivot = arr[Math.floor(Math.random() * arr.length)];
  const left = [], right = [];

  for (let i = 1; i < arr.length; i++) {
    (arr[i] < pivot ? left : right).push(arr[i]);
  }

  return [...sort(left), pivot, ...sort(right)];
}

const list = new Array(1_000_000).fill(0).map((_, i) => Math.random() * i);

console.time();
console.log(sort(list));
console.timeEnd();