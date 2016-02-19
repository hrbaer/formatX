var X = require('../src/formatX.js');

var latFmt = "%Format decimal latitude|$lat|_abs|$absdeg|_int|@[-90,90]|_clip|&  |_right|>>|°|$absdeg|_mins|&00|_right|>>|'|$lat|_sign| S:  : N";
var lonFmt = "%Format decimal longitude|$lat|_abs|$absdeg|_int|@[-180,180]|_wrap|&   |_right|>>|°|$absdeg|_mins|&00|_right|>>|'|$lat|_sign| W:  : E";

var fmtLat = X.formatX(latFmt);
var fmtLon = X.formatX(lonFmt);

for (var lat = -90; lat <= 90; lat += 5) {
  var line = [];
  for (var lon = -180; lon <= 180; lon += 60) {
    line.push(fmtLat(lat) + ' ' + fmtLon(lon));
  }
  console.log(line.join('     '));
}