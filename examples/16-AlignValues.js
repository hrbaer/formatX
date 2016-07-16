var X = require('../src/formatX.js');

// ASCII border table using 3 formats.
var fmtBorder =        '∙––––––––––∙–––––––––––––––∙';
var fmtTitle  = '$v/$e/&|          |               |/$e/#6/_cal/$v/#19/_cal/>>';
var fmtRecord = '$v/$e/&|          |               |/$e/#7/_ral/$v/&./#19/_sal/>>';

X.formatX.setSeparator('/');
var borderOut = X.formatX(fmtBorder);
X.formatX.setSeparator('/');
var titleOut  = X.formatX(fmtTitle);
X.formatX.setSeparator('/');
var recordOut = X.formatX(fmtRecord);

console.log(borderOut());
console.log(titleOut('Exponent', 'Value'));
console.log(borderOut());
for (var e = -6; e < 6; ++e) {
  var v = Math.pow(10, e);
  console.log(recordOut(e, v));
}
console.log(borderOut());
