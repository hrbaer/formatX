var X = require('../src/formatX.js');

X.formatX.setFunction('_date', function() { return new Date() });

var fmt = "Current date: |_date|>>";
var output = X.formatX(fmt);

console.log(output());