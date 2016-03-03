var X = require('../src/formatX.js');

var fmt = "Name: |$entry|&name|_at|>>|, Prename: |$entry|&prename|_at|>>";
var output = X.formatX(fmt);

console.log(output({ name: 'Bear', prename: 'John' }));