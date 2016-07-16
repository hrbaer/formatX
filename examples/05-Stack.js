var X = require('../src/formatX.js');

// Entries put on the internal stack will be popped in reverse order.
console.log(X.formatX('%Stack|#1|#2|#3|#4|#5|>>|,|>>|,|>>|,|>>|,|>>')());