var X = require('../src/formatX.js');

var numbers = 'no::one::two::three::four::five::six::seven::eight::nine::ten::eleven::twelf';
var fmt = `There |$num|_plural|is::are| |$num|${numbers}|>>| object|$num|_plural|::s|.`;
var out = X.formatX(fmt);

for (var i = 0; i <= 12; ++i) {
  console.log(out(i));
}