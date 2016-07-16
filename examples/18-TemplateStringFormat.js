var X = require('../src/formatX.js');

// Making formats more readable by using template strings and comments.
var numbers = 'no::one::two::three::four::five::six::seven::eight::nine::ten::eleven::twelf';
var fmt =
`%
--------------------------------
|There |$$num|%
--------------------------------
--- plural forms ----
|_plural|is::are|%
--------------------------------
--- number word -----|
   |$num|${numbers}|>>| object|%
--------------------------------
--- plural ending ---
|$num|_plural|::s|.
|%------------------------------
`;

var out = X.formatX(fmt);

for (var i = 0; i <= 12; ++i) {
  console.log(out(i));
}