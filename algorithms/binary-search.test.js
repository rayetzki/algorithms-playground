import { it, describe } from 'node:test';
import * as assert from 'node:assert/strict';
import binarySearch from './binary-search.js';

// O(n)
const regularSearch = (array, element) => array.find(x => x === element); 
const list = Array.from(Array(1000000).keys());

describe('binary search', () => {
  it('Is faster than O(n) search', () => {
    const regularTimeStart = performance.now();
    regularSearch(list, 105204);
    
    const regularTimeEnd = performance.now();
    const regularTime = regularTimeEnd - regularTimeStart;
  
    const binaryTimeStart = performance.now();
    binarySearch(list, 105204);
    const binaryTimeEnd = performance.now();
    const binaryTime = binaryTimeEnd - binaryTimeStart;

    assert.strictEqual(binaryTime < regularTime, true);
  });
});