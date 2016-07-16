var X = require('../src/formatX.js');

var fmt = "Name: |$name|>>|, Prename: |$prename|>>";
var output = X.formatX(fmt);

// The following two calls are equivalent.
console.log(output({ key: '$name', value: 'Bear' }, { key: '$prename', value: 'John' }));
console.log(output({ $name: 'Bear' }, { $prename: 'John' }));
