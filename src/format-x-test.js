var formatX = require('./formatX.js').formatX;

var fmt = "Coordinates: |_latlon|>>";
var output = formatX(fmt);

console.log(output([47.27055, 8.641388]));
