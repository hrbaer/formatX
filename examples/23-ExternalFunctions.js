var X = require('../src/formatX.js');

// Use JavaScript functions.
var fmt = "$$angle|Angle: |&  |_right|>>|°, sin: |$angle|_Math.PI|#180|_/|_*|_Math.sin|#6|_fix|>>";
var out = X.formatX(fmt);

for (var i = 0; i <= 90; i += 5) {
  console.log(out(i));
}

