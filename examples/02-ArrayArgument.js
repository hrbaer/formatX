var X = require('../src/formatX.js');

// Arguments passed as an array can be accessed by index.
var fmt = "$entry|Name: |$entry|#0|_at|>>|, Prename: |$entry|#1|_at|>>";
var output = X.formatX(fmt);

console.log(output(['Bear', 'John']));