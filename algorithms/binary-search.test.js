const binarySearch = require('./binary-search');

// O(n)
const regularSearch = (array, element) => array.find(x => x === element); 
const list = Array.from(Array(1000000).keys());

it('Is faster than O(n) search', () => {
  const regularTimeStart = process.hrtime.bigint();
  regularSearch(list, 4);
  const regularTimeEnd = process.hrtime.bigint();
  const regularTime = regularTimeEnd - regularTimeStart;

  const binaryTimeStart = process.hrtime.bigint();
  binarySearch(list, 4);
  const binaryTimeEnd = process.hrtime.bigint();
  const binaryTime = binaryTimeEnd - binaryTimeStart;

  expect(regularTime).toBeGreaterThan(binaryTime);
});