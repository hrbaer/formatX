var X = require('../src/formatX.js');

function itor() {
  var pat = [[],[0],[0,0],[0,0,0],[0,1],[1],[1,0],[1,0,0],[1,0,0,0],[0,2]];
  var pos = [['I','X','C','M'],['V','L','D'],['X','C','M']];
  return function(i) {
    return +i ? i.toString()
      .split('')
      .reverse()
      .map(function(d, i) {
        return pat[+d].map(function(c) {
          return pos[c] ? pos[c][i] : [c] })
        .join('')})
      .reverse()
      .join('') : i;
  }
};

X.formatX.setFunction('_itor', itor());

var fmt = "$i|&    |_right|>>| |$i|_itor|>>";
var output = X.formatX(fmt);

for (var i = 1; i < 4000; ++i) {
  console.log(output(i));
}
