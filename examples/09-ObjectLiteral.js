var X = require('../src/formatX.js');

// This is an object literal using JSON.
var fmt = '@{"a":3,"b":4}|$$s|&a|_at|a = |>>|, b = |$s|&b|_at|>>';
var out = X.formatX(fmt);
console.log(out());
