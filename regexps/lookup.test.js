import { it, describe } from 'node:test';
import * as assert from 'node:assert/strict';
import { nonNegativeInts, insertAfterBody } from './lookup.js';

describe('lookup', () => {
    it('Correctly finds all non-negative integers', () => {
        const testString = "0 12 -5 123 -18";
        const result = testString.match(nonNegativeInts);
        const correct = ['0', '12', '123'];
        const incorrect = ['-5', '-18'];
        correct.forEach(answer => assert.strictEqual(result.includes(answer), true));
        incorrect.forEach(answer => assert.strictEqual(result.includes(answer), false));
    });
    
    it('Inserts HTML after body', () => {
        const testStringBefore = `
            <html>
            <body style="height: 200px">
            ...
            </body>
            </html>
        `;
    
        const testStringAfter = testStringBefore.replace(insertAfterBody, `<h1>Hello</h1>`);
        
        assert.strictEqual(testStringAfter, `
            <html>
            <body style="height: 200px"><h1>Hello</h1>
            ...
            </body>
            </html>
        `);
    });
});