var X = require('../src/formatX.js');

// You can temporarily change the separator if you need the pipe character in your code.
var fmt = '$num/Print /$num/&  /_right/>>/ pipe character/$num/#1/_gt/: ::s:/ /&|/$num/_rep/>>';
X.formatX.setSeparator('/');
var out = X.formatX(fmt);

for (var i = 1; i <= 12; ++i) {
  console.log(out(i));
}