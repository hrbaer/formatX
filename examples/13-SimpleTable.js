var X = require('../src/formatX.js');

// A simple table output using fix-sized columns.
var table = `$n|%
---------------------------------------|%
number |# 6|_rfld|>>|$n|#2|_pow|%
square |# 8|_rfld|>>|$n|#3|_pow|%
cube   |#10|_rfld|>>|$n|_log10|#5|_fix|%
log10  |#10|_rfld|>>|%
---------------------------------------`;
  
var fmt = X.formatX(table);

for (var i = 1; i <= 100; ++i) {
  console.log(fmt({ key: '$n', value: i }));
}
