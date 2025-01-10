import { describe, it } from 'node:test';
import lcs from './longest-common-subsequence.js';
import * as assert from 'node:assert/strict';

describe('longest common subsequence', (t) => {
  it('Basic', () => {
    const A = [1, 4, 5, 6, 9, 10, 11];
    const B = [6, 4, 9, 5, 9, 11];

    const result = lcs(A, B);

    assert.strictEqual(result === 4, true);
  });

  it('First is empty', () => {
    const A = [];
    const B = [1, 15, 4, 5, 6, 9, 10, 11];
    
    const result = lcs(A, B);

    assert.strictEqual(result === 0, true);
  });

  it('Both empty', () => {
    const A = [];
    const B = [];

    const result = lcs(A, B);

    assert.strictEqual(result === 0, true);
  });

  it('Same', () => {
    const A = [1, 4, 5, 6, 9, 10, 11];
    const B = [1, 4, 5, 6, 9, 10, 11];

    const result = lcs(A, B);

    assert.strictEqual(result === A.length, true);
  });
});