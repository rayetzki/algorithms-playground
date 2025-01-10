import { describe, it } from 'node:test';
import lis from './largest-increasing-subsequence.js';
import * as assert from 'node:assert/strict';

describe(('largest increasing subsequence'), () => {
  it('Returns correct subsequence length', () => {
    const sequence = [10, 22, 9, 33, 21, 50, 41, 60];
    const result = lis(sequence);
    assert.strictEqual(result === 5, true);
  });
});