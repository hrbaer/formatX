var X = require('../src/formatX.js');

// Add a new function to the formatter.
X.formatX.setFunction('_date', function() { return new Date() });

var fmt = "Current date: |_date|>>";
var output = X.formatX(fmt);

console.log(output());