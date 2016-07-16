var X = require('../src/formatX.js');

// The arguments are put on a stack,
// they are popped in reverse order.
var fmt = "Name: |>>|, Prename: |>>";
var output = X.formatX(fmt);

console.log(output('John', 'Bear'));
