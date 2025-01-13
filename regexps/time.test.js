import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import time from './time.js';

describe('time', () => {
    it('Correctly matches time', () => {
        const testString = 'Breakfast at 09:00 in the room 123:456.';
        const { hours, minutes } = testString.match(time).groups;
        assert.equal(hours, '09');
        assert.equal(minutes, '00');    
    });
});