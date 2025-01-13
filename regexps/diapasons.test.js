import { it, describe } from 'node:test';
import * as assert from 'node:assert/strict';
import timeDiapason from './diapasons.js';

describe('diapasons', () => {
    it('Correctly matches time', () => {
        const testString = "Breakfast at 09:00. Dinner at 21-30";
        const result = testString.match(timeDiapason);
        assert.equal(result.includes('09:00'), true);
        assert.equal(result.includes('21-30'), true);
    });
});