var S = require('../src/sprintf.js');
var X = require('../src/formatX.js');

// What library formats faster, sprintf or formatX?
function dec2dmlat(a) {
  var absdeg = Math.abs(a);
  return S.sprintf("%d°%02d' %s", Math.floor(absdeg), Math.floor((absdeg * 60) % 60), ((a < 0) ? 'S' : (a > 0) ? 'N' : ''));
}

var latFmt = "$$lat|_abs|$$absdeg|_int|>>|°|$absdeg|_mins|&00|_right|>>|'|$lat|_sign| S:: N";
var fmtLat = X.formatX(latFmt);

var fmtPer = X.formatX("$time|$$text|>>|$time|#3|_fix|>>| ms");

function showPerformance(text, time) {
  console.log(fmtPer(text, time));
}


var Timer = typeof window == 'undefined' ? Date : window.performance;
function estimatePerformance(text, callback) {
  var t0 = Timer.now();
  return function() {
    var t = Timer.now() - t0;
    callback(text, t);
  }
}


var p = estimatePerformance('Elapsed time "sprintf": ', showPerformance);
for (var y = -90000; y <= 90000; ++y) {
  var s = dec2dmlat(0.001 * y);
}
p();


var p = estimatePerformance('Elapsed time "formatX" (compiled once): ', showPerformance);
for (var y = -90000; y <= 90000; ++y) {
  var s = fmtLat(0.001 * y);
}
p();


var p = estimatePerformance('Elapsed time "formatX" (recompiled): ', showPerformance);
for (var y = -90000; y <= 90000; ++y) {
  var s = X.formatX(latFmt)(0.001 * y);
}
p();
