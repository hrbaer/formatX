var X = require('../src/formatX.js');

// Similar to arrays, properties can be accessed by the "at" operator.
var fmt = "$entry|Name: |$entry|&name|_at|>>|, Prename: |$entry|&prename|_at|>>";
var output = X.formatX(fmt);

console.log(output({ name: 'Bear', prename: 'John' }));