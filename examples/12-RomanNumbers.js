var X = require('../src/formatX.js');
var R = require('./itor.js');

// When using DropScript, do not forget to drop the itor library first!
X.formatX.setFunction('_itor', R.itor());

var fmt = "$i|$i|&    |_right|>>| |$i|_itor|>>";
var output = X.formatX(fmt);

for (var i = 1; i < 4000; ++i) {
  console.log(output(i));
}
