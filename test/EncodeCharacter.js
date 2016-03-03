var X = require('../src/formatX.js');

var fmt = 'Print |$num|&  |_right|>>| pipe character|$num|#1|_gt|: ::s:| |&%7c|_deco|$num|_rep|>>';
var out = X.formatX(fmt);

for (var i = 1; i <= 12; ++i) {
  console.log(out(i));
}