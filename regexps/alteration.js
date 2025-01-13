export const languages = /Java(Script)?|(PHP)|C(\+\+)?/g;
export const bbCode = /\[(b|url|quote)\].*?\[\/\1\]/gs;
export const quotedStrings = /"(\\.|[^"\\])*"/g;
export const styleTag = /<style(>|\s.*?>)/g;