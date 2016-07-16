var X = require('../src/formatX.js');

// Calculated values can also be retrieved from the formatter
var fmt = "$$n|_sign|$sig|$n|_abs|$abs|@[0,0.25,0.5,1,2,5,10]|$abs|_at|$sig|_mul|$val|$abs| 0:: ¼:: ½:: 1:: 2:: 5::10| |$n|_sign|#1|_add|☜:: ::☞";
var output = X.formatX(fmt);

var align = X.formatX("$val|&(      )|$val|&.|#4|_sal|>>");

for (var i = -6; i <= 6; ++i) {
  console.log(output(i), '\t' + align(output.getValue('$val')));
}
