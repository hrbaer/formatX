var X = require('../src/formatX.js');

// Output text and add the passed argument from the stack using the >> operator.
var fmt = 'Hello, |>>|!';
var name = 'my dear';
console.log(X.formatX(fmt)(name));