var X = require('../src/formatX.js');

// Format geographic coordinates.
// Watch the detailed description.
var latFmt = 
`% Format decimal latitude
|$$lat|%      - save and use the latitude argument
|_abs|%       - calculate the absolute degrees
|$$adeg|%     - save and use the last value
|_int|%       - convert to integer
|@[-90,90]|%  - create a range as an array
|_clip|%      - limit degrees to given range
|&  |%        - create field with two empty spaces
|_right|%     - right-align value in field
|>>|%         - output degrees
|°|%          - add degree label
|$adeg|%      - use absolute degrees again
|_mins|%      - calculate the minutes
|&00|%        - create field containing two zeros
|_right|%     - right-align value
|>>|%         - output minutes
|'|%          - add seconds label
|$lat|%       - use the latitude again
|_sign|%      - get the sign (-1, 0, or 1)
|#1|%         - create a value of 1
|_add|%       - add 1 to the sign value (-> 0, 1, 2)
| |%          - add an empty space
|S:: ::N|%    - use label (S, nothing, or N)
`;

var lonFmt =
`%Format decimal longitude|%
|$$lon|%        - save and use the longitude argument
|_abs|%         - calculate the absolute degrees
|$$adeg|%       - save and use the last value
|_int|%         - convert to integer
|@[-180,180]|%  - create a range as an array
|_wrap|%        - wrap degrees within given range
|&   |%         - create field with two empty spaces
|_right|%       - right-align value in field
|>>|%           - output degrees
|°|%            - add degree label
|$adeg|%        - use absolute degrees again
|_mins|%        - calculate the minutes
|&00|%          - create field containing two zeros
|_right|%       - right-align value
|>>|%           - output minutes
|'|%            - add minutes label
|$lon|%         - use the longitude again
|_sign|%        - get the sign (-1, 0, or 1)
|#1|%           - create a value of 1
|_add|%         - add 1 to the sign value (-> 0, 1, 2)
| |%            - add an empty space
|W:: ::E|%      - use label (W, nothing, or E)
|`;

var fmtLat = X.formatX(latFmt);
var fmtLon = X.formatX(lonFmt);

for (var lat = -90; lat <= 90; lat += 5) {
  var line = [];
  for (var lon = -180; lon <= 180; lon += 60) {
    line.push(fmtLat(lat) + ' ' + fmtLon(lon));
  }
  console.log(line.join('     '));
}