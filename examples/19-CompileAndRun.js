var X = require('../src/formatX.js');

// Compile and run formatter in one step.
for (var i = 0; i <= 12; ++i) {
  console.log(X.formatX('$num|Print |$num|&  |_right|>>| pipe character|$num|#1|_eq|s: :::  |&%7c|_deco|$num|_rep|>>')(i));
}