var X = require('../src/formatX.js');

// HTML formatting - Reload DropScript to remove the result.
// Tnis will not run with Node.js.
var fmt = `$$h|%
-------------------------------------------------|%
-- Hours ----|_int|>>|<sup>h</sup>|%
-- Minutes --|$h|_mins|&00|_right|>>|<sup>m</sup>|%
-- Seconds --|$h|_secs|&00|_right|>>|<sup>s</sup>|%
--------------------------------------------------
`;

var html = X.formatX(fmt)(12.5823);

var div = document.getElementById('sup');
if (!div) {
  div = document.createElement('div');
  div.id = 'sup';
  var refNode = document.getElementById('result');
  refNode.parentNode.insertBefore(div, refNode.nextSibling);
}
div.style.cssText = 'font-size:36pt;color:#d00;';
div.innerHTML = html;
