var X = require('../src/formatX.js');

var pipe = '|||||';
var fmt = `Escape characters: |$pipe|>>|&%7C%7C%7C%7C%7C%7C%7C%7C%7C%7C|_deco|${pipe}|>>`;

var output = X.formatX(fmt);


console.log(output({ $pipe: '|' }));