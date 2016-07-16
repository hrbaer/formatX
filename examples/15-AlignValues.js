var X = require('../src/formatX.js');

// ASCII border table.
X.formatX.setSeparator('/');
var fmt = "$v/$e/&|          |               |/$e/#7/_ral/$v/&./#19/_sal/>>";

var out = X.formatX(fmt);

console.log('+----------+---------------+');
console.log('| Exponent |     Value     |');
console.log('+----------+---------------+');
for (var e = -6; e < 6; ++e) {
  var v = Math.pow(10, e);
  console.log(out(e, v));
}
console.log('+----------+---------------+');
