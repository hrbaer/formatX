/*
  formatX: An Alternative Formatter

  Author:
  H. R. Baer
  hbaer@ethz.ch

  Version history:
  0.1.0 09/02/2016

  Usage
  1. Define a format string.
     | A Separator for items, such as values, variables, labels and functions
     $ Prefix used to specify a variable of your choice
     # Prefix used to denote a number
     & Prefix for a string
     _ Function prefix
     > Output of the current value
     % If you like to use comments
  2. Call fx(fmt) to get a format function for the specified format string.
     Add any functions using setFunction(name, function) to extend the available functions.
  3. Call the format function with any number of unnamed and named arguments.
     A named argument is defined by the following object: { name: <name>, value: <value> }
*/

(function(global) {

  var formatX = function(fmt) {

    // Special characters
    var sep = '|', // separates items
        v_r = '$', // denotes variables
        num = '#', // used for numbers
        str = '&', // specifies string
        jsn = '@', // introduces a JSON
        fun = '_', // function start with an underbar
        out = '>', // output the current value
        com = '%'; // comment only

    // Useful functions
    var functions = {
      abs: Math.abs,
      exp: Math.exp,
      int: Math.trunc,
      log: Math.log,
      log2: Math.log2,
      log10: Math.log10,
      pow: Math.pow,
      round: Math.round,
      sqrt: Math.sqrt,
      add: function(x, y) { return x + y },
      sub: function(x, y) { return x - y },
      mul: function(x, y) { return x * y },
      div: function(x, y) { return x / y },
      step: function(x, n) { return n * Math.trunc(x / n) },
      str: function(x) { return x.toString() },
      strb: function(x, b) { return x.toString(b) },
      subs: function(x, a, b) { return x.substr(a, b) },
      num: function(x) { return +x },
      dtor: function(x) { return x * Math.PI / 180 },
      rtod: function(x) { return x * 180 / Math.PI },
      float: function(s) { return parseFloat(s) },
      sqr: function(x) { return x * x },
      length: function(x, y) { return Math.sqrt(x * x + y * y) },
      local: function(x) { return x.toLocaleString() },
      prec: function(x, p) { return x.toPrecision(p) },
      fix: function(x, p) { return x.toFixed(p) },
      fract: function(x) { return x - Math.trunc(x) },
      mins: function(x) { return Math.floor(60 * x) % 60 },
      secs: function(x) { return Math.floor(3600 * x) % 60 },
      sign: function(x) { return Math.sign(x) + 1 },
      clip: function(x, r) { return x < r[0] ? r[0] : x > r[1] ? r[1] : x },
      wrap: function(x, r) { var d = r[1] - r[0]; while (x < r[0]) { x += d }; while (x > r[1]) { x -= d }; return x },
      sum: function() { var args = Array.prototype.slice.call(arguments); return args.reduce(function(p, c) { return p + c }, 0) },
      chars: function(a) { return new Array(a[1] + 1).join(a[0]) },
      array: function() { return Array.prototype.slice.call(arguments) },
      at: function(a, i) { return a[i] },
      right: function(x, t) { return (t + x).slice(-t.length) },
      left: function(x, t) { return (x + t).slice(0, t.length) }
    };
  
    var ops;
  
    // Parse the format specifier
    function parse() {
      var toks = fmt.split(sep);
      ops = toks.map(function(tok) {
        var op;
        var c = tok.charAt(0);
        switch (c) {
        case v_r: // variable
          op = { type: 'var', name: tok };
          break;
        case num: // number
          op = { type: 'num', value: parseFloat(tok.substr(1)) };
          break;
        case str: // string
          op = { type: 'str', value: tok.substr(1) };
          break;
        case jsn: // JSON
          op = { type: 'jsn', value: JSON.parse(tok.substr(1)) };
          break;
        case fun: // function
          op = { type: 'fun', fun: tok.substr(1) };
          break;
        case out: // output
          op = { type: 'out' };
          break;  
        case com: // comment
          op = { type: 'com', text: tok.substr(1) };
          break;  
        default: // label
          op = { type: 'lab', labs: tok.split(':') };
          break;
        }
        return op;
      });
    };
    if (fmt) { parse() }
  
    var format = function() {
      
      var args = Array.prototype.slice.call(arguments);
      var stack = []; // holds the currently used values
      var store = {}; // stores named variables
    
      args.forEach(function(arg) {
        if (arg.name && arg.name.charAt(0 === '$')) {
          stack.push(arg.value);
          store[arg.name] = arg.value;
        }
        else {
          stack.push(arg);
        }
      });

      var s = ops.reduce(function(p, c) {
        var out = '';
        switch (c.type) {
        case 'var':
          if (store[c.name] !== undefined) {
            stack.push(store[c.name]);
          }
          else {
            store[c.name] = stack[stack.length - 1];
          }
          break;
        case 'num':
        case 'str':
        case 'jsn':
          stack.push(c.value);
          break;
        case 'fun':
          var fun = functions[c.fun];
          if (fun) {
            var nargs = fun.length || stack.length;
            var rv = fun.apply(fun, stack.splice(-nargs));
            if (rv !== undefined) {
              stack.push(rv);
            }
          }
          else {
            // On our own mission
            throw (missingFunction(c.fun));
          }
          break;
        case 'out':
          var item = stack.pop();
          out = item === undefined ? '' : item;
          break;
        case 'lab':
          if (c.labs.length > 1) {
            out = c.labs[stack.pop()];
          }
          else {
            out = c.labs[0];
          }
          break;
        };
        return p + out;
      }, '');

      return s;
    }
  
    // Add a new function
    format.setFunction = function(name, fun) {
      functions[name.substr(1)] = fun;
    }

    // Test a function
    format.testFunction = function(name) {
      var args = Array.prototype.slice.call(arguments);
      var fun = functions[name.substr(1)];
      if (fun) { return fun.apply(fun, args.splice(1 - args.length)); }
      else { console.error(missingFunction(name)); }
    }
  
    return format;
  }
  
  if (typeof exports !== "undefined") {
    exports.formatX = formatX;
  }
  else {
    global.formatX = formatX;
  }
  
  var missingFunction = formatX('&ERROR: function "|>>|$msg|>>|&" not available!|>>');
  

})(typeof window === "undefined" ? this : window);