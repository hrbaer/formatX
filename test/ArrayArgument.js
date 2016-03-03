var X = require('../src/formatX.js');

var fmt = "Name: |$entry|#0|_at|>>|, Prename: |$entry|#1|_at|>>";
var output = X.formatX(fmt);

console.log(output(['Bear', 'John']));