import { it, describe } from 'node:test';
import * as assert from 'node:assert';
import { htmlColors, threeDots } from './quantifier.js';

describe('quantifiers', () => {
    it('Correctly matches html HEX colors', () => {
        const testString = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";
        const result = testString.match(htmlColors);
        assert.equal(result.includes('#121212'), true);
        assert.equal(result.includes('#AA00ef'), true);
        assert.equal(result.includes('f#fddee'), false);
        assert.equal(result.includes('#fd2'), false);
        assert.equal(result.includes('#12345678'), false);
    });
    
    it('Correctly matches three dots and more', () => {
        const testString = "Hello!... How are you?.....";
        const result = testString.match(threeDots);
        assert.equal(result.includes('...'), true);
        assert.equal(result.includes('.....'), true);
    });
});