var X = require('../src/formatX.js');

// A table ornamented with ASCII borders
var table = `%
 /+----------+----------+----------+----------+
/$n/%
/&|          |          |          |          |/%
-/$n/#10/_ral/%--------------------------------
----/$n/#2/_pow/#21/_ral/%---------------------
--------------------/$n/#3/_pow/#32/_ral/%-----
------------------------/$n/_log10/#5/_fix/#43/%
/_ral/>>`;

X.formatX.setSeparator('/');
var fmt = X.formatX(table);

for (var i = 1; i <= 100; ++i) {
  console.log(fmt(i));
}
console.log(X.formatX('+----------+----------+----------+----------+')());
