var X = require('../src/formatX.js');

// You have to encode the pipe character by its char code and decode it.
// Alternatively, pass the character as an argument.
var fmt = 'Escape characters: |$pipe|>>| |&%7C%7C%7C|_deco|>>||||||>>';

var output = X.formatX(fmt);


console.log(output({ $pipe: '||' }));