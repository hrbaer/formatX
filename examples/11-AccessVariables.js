var X = require('../src/formatX.js');

// Access variables.
var fmt = '$v4|$v3|$v2|$v1|[no output]';
var out = X.formatX(fmt);

console.log(out(1, 'zwei', [1,'zwei',3], {a:1,b:2,c:3}));
console.log(out.getValue('$v1'));
console.log(out.getValue('$v2'));
console.log(out.getValue('$v3'));
console.log(JSON.stringify(out.getValue('$v4')));
