var X = require('../src/formatX.js');

var fmt = "_rep|>>";
var output = X.formatX(fmt);

console.log(output('+---------', 10));