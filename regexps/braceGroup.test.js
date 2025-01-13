import { it, describe } from 'node:test';
import * as assert from 'node:assert/strict';
import { hexColor, allDigits, parse, macAddress } from './braceGroup.js';

describe('brace groups', () => {
    it('Correctly matches hex color', () => {
        const testString = "color: #3f3; background-color: #AA00ef; and: #abcd";
        const match = testString.match(hexColor);
        const correct = ['#3f3', '#AA00ef'];
        const incorrect = ['#abcd'];
        correct.forEach(answer => assert.equal(match.includes(answer), true));
        incorrect.forEach(answer => assert.equal(match.includes(answer), false));
    });

    it('Correctly finds all digits', () => {
        const testString = "-1.5 0 2 -123.4.";
        const result = testString.match(allDigits);
        const answers = ['-1.5', '0', '2', '-123.4']
        answers.forEach(answer => assert.strictEqual(result.includes(answer), true));
    });

    it('Correctly finds all operands', () => {
        const testString = "1.2 * 3.4";
        assert.deepStrictEqual(parse(testString), ['1.2', '*', '3.4']);
    });

    it('Correctly matches MAC address', () => {
        assert.match('01:32:54:67:89:AB', macAddress);
        assert.doesNotMatch('0132546789AB', macAddress);
        assert.doesNotMatch('01:32:54:67:89', macAddress);
        assert.doesNotMatch('01:32:54:67:89:ZZ', macAddress);
    });
});