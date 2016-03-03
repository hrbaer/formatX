var X = require('../src/formatX.js');

X.formatX.setSeparator('/');

var fmt = 'Print /$num/&  /_right/>>/ pipe character/$num/#1/_gt/: ::s:/ /&|/$num/_rep/>>';
var out = X.formatX(fmt);

for (var i = 1; i <= 12; ++i) {
  console.log(out(i));
}