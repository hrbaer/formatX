var X = require('../src/formatX.js');

var fmt = "Name: |>>|, Prename: |>>";
var output = X.formatX(fmt);

console.log(output('John', 'Bear'));
