var X = require('../src/formatX.js');

// A table ornamented with ASCII borders
var frame  = '|          |          |          |          |';
var border = '+----------+----------+----------+----------+';

var table = "$f|$n|$f|$n|#10|_ral|$n|#2|_pow|#21|_ral|$n|#3|_pow|#32|_ral|$n|_log10|#5|_fix|#43|_ral|>>";

var fmt = X.formatX(table);

console.log(border);
for (var i = 1; i <= 100; ++i) {
  console.log(fmt(i, frame));
  console.log(border);
}
