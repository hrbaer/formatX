var X = require('../src/formatX.js');

// Capitalize words.
var fmt = '_cap|>>';
var out = X.formatX(fmt);

var text = "a midsummer night's dream";

console.log(text);
console.log(out(text));
