// Convert arabic numeral to roman numeral

+function(window) {
  function itor() {
    var pat = [[],[0],[0,0],[0,0,0],[0,1],[1],[1,0],[1,0,0],[1,0,0,0],[0,2]];
    var pos = [['I','X','C','M'],['V','L','D'],['X','C','M']];
    return function(i) {
      return +i ? i.toString()
        .split('')
        .reverse()
        .map(function(d, i) {
          return pat[+d].map(function(c) {
            return pos[c] ? pos[c][i] : [c] })
          .join('')})
        .reverse()
        .join('') : i;
    }
  };
  
  if (typeof exports !== "undefined") {
    exports.itor = itor
  }
  else {
    window.itor = itor
  }
} (typeof window === "undefined" ? this : window);

console.log('Library loaded.');
