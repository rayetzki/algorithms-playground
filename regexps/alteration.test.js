import { it, describe } from 'node:test';
import * as assert from 'node:assert/strict';
import { languages, bbCode, quotedStrings, styleTag } from "./alteration.js";

describe('alteration', () => {
    it('Correctly finds all languages', () => {
        const testString = "Java JavaScript PHP C++ C";
        const result = testString.match(languages);
        const answers = ["Java", "JavaScript", "PHP", "C++", "C"];
        answers.forEach(answer => assert.strictEqual(result.includes(answer), true));
    });
    
    it('Correctly finds all BB tags', () => {
        const testString = "..[url][b]http://google.com[/b][/url]..";
        const result = testString.match(bbCode);
        assert.strictEqual(result.includes("[url][b]http://google.com[/b][/url]"), true);
    });
    
    it('Correctly finds all quoted strings', () => {
        const testString = ' .. "test me" .. "Say \\"Hi\\"!" .. "\\\\ \\"" .. ';
        const result = testString.match(quotedStrings);
        assert.strictEqual(result[0], '"test me"');
        assert.strictEqual(result[1], '"Say \\"Hi\\"!"');
        assert.strictEqual(result[2], '"\\\\ \\""');
    });
    
    it('Correctly finds tags', () => {
        const testString = '<style> <styler> <style test="...">';
        const result = testString.match(styleTag);
        assert.strictEqual(result.includes("<style>"), true);
        assert.strictEqual(result.includes('<styler>'), false);
        assert.strictEqual(result.includes('<style test="...">'), true);
    });
});