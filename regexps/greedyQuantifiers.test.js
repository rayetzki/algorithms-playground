import { it, describe } from 'node:test';
import * as assert from 'node:assert';
import { htmlComments, htmlTags } from './greedyQuantifiers.js';

describe('greedy quantifiers', () => {
    it('Correctly matches HTML comments', () => {
        const testString = `... <!-- My -- comment 
        test --> ..  <!----> ..
        `;
        const result = testString.match(htmlComments);
        assert.equal(result.includes('<!-- My -- comment \n        test -->'), true);
        assert.equal(result.includes('<!---->'), true);
    });
    
    it('Correctly matches HTML tags', () => {
        const testString = '<> <a href="/"> <input type="radio" checked> <b>';
        const result = testString.match(htmlTags);
        assert.strictEqual(result.includes('<a href="/">'), true);
        assert.strictEqual(result.includes('<>'), false);
        assert.strictEqual(result.includes('<input type="radio" checked>'), true);
        assert.strictEqual(result.includes('<b>'), true);
    });
});