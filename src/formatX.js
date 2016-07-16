/*
  formatX: An Alternative Formatter

  Author:
  H. R. Baer
  hbaer@ethz.ch

  Version history:
  0.1.0 09/02/2016
  0.2.0 24/02/2016
  0.3.0 03/03/2016
  0.4.0 16/04/2016 Macros added

  Usage
  1. Define a format string.
     | A Separator for items, such as values, variables, labels and functions
     $ Prefix used to specify a variable of your choice
     # Prefix used to denote a number
     & Prefix for a string
     @ JSON
     _ Function prefix
     > Output of the current value
     % If you like to use comments
  2. Call fx(fmt) to get a format function for the specified format string.
     Add any functions using setFunction(name, function) to extend the available functions.
  3. Call the format function with any number of unnamed and named arguments.
     A named argument is defined by the following object: { name: <name>, value: <value> }.
     Alternatively, write { _<name>: <value> }.

  Comments
  - You might also use _<Functionname> such as _Math.sin (this expression will be eval-uated)
*/

(function(topLevel) {

  const VERSION = '1.0.0';


  // Special characters
  const SEP = '|', // separates items
        VAR = '$', // denotes variables
        NUM = '#', // used for numbers
        STR = '&', // specifies strings
        JSN = '@', // introduces a JSON expression
        FUN = '_', // functions start with an underbar
        OUT = '>', // output the current value
        COM = '%'; // comment only

  "use strict";

  var _sep = SEP;
  
  // Useful functions
  var functions = {
    vers: function() { return VERSION },
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
    mod: function(x, y) { return x % y },
    sqr: function(x) { return x * x },
    eq: function(x, y) { return x == y ? 1 : 0 },
    neq: function(x, y) { return x != y ? 1 : 0 },
    lt: function(x, y) { return x < y ? 1 : 0 },
    le: function(x, y) { return x <= y ? 1 : 0 },
    gt: function(x, y) { return x > y ? 1 : 0 },
    ge: function(x, y) { return x >= y ? 1 : 0 },
    not: function(x) { return x ? 0 : 1 },
    pop: function(x) {},
    plural: function(n) { return n > 1 ? 1 : 0 },
    str: function(x) { return x.toString() },
    strb: function(x, b) { return x.toString(b) },
    subs: function(x, a, b) { return x.substr(a, b) },
    lc: function(s) { return s.toLowerCase() },
    uc: function(s) { return s.toUpperCase() },
    cap: function(s) { return s.replace(/(\s|^)([a-z])/g, function(x) { return x.toUpperCase() }) },
    num: function(x) { return +x },
    nan: function(x) { return isNaN(x) },
    dtor: function(x) { return x * Math.PI / 180 },
    rtod: function(x) { return x * 180 / Math.PI },
    mstod: function(n) { return new Date(n) },
    dtoms: function(d) { return Date.parse(d).valueOf() },
    now: function() { return new Date() },
    float: function(s) { return parseFloat(s) },
    length: function(x, y) { return Math.sqrt(x * x + y * y) },
    loc: function(x) { return x.toLocaleString() },
    prec: function(x, p) { return x.toPrecision(p) },
    fix: function(x, p) { return x.toFixed(p) },
    fract: function(x) { return x - Math.trunc(x) },
    mins: function(x) { return Math.floor(60 * x) % 60 },
    secs: function(x) { return Math.floor(3600 * x) % 60 },
    sign: function(x) { return Math.sign(x) },
    clip: function(x, r) { return x < r[0] ? r[0] : x > r[1] ? r[1] : x },
    wrap: function(x, r) { var d = r[1] - r[0]; while (x < r[0]) { x += d }; while (x > r[1]) { x -= d }; return x },
    rep: function(s, n) { return Array(n).fill(s).join('') },
    at: function(a, i) { return a[i] },
    right: function(x, t) { return ('' + t + x).slice(-t.length) },
    left: function(x, t) { return ('' + x + t).slice(0, t.length) },
    ral: function(s, x, p) { x = x.toString(); return insertAt(s, x, p - x.length) },
    lal: function(s, x, p) { return insertAt(s, x.toString(), p) },
    sal: function(s, x, c, p) { x = x.toString(); var d = x.indexOf(c); p -= d >= 0 ? d : x.length; return insertAt(s, x, p) },
    cal: function(s, x, p) { x = x.toString(); return insertAt(s, x, p - (x.length >> 1)) },
    deco: function(s) { return decodeURI(s) },
    pi: function() { return Math.PI },
    e: function() { return Math.E },
    lfld: function(x, n) { return macro('lfld')(x, n); },
    rfld: function(x, n) { return macro('rfld')(x, n); },
    dms: function(d) { return macro('dms')(d); },
    lat: function(d) { return macro('lat')(d); },
    lon: function(d) { return macro('lon')(d); },
    latlon: function(ll) { return macro('latlon')(ll); }
  };

  // Add some aliases
  var aliases = { add: '+', sub: '-', mul: '*', div: '/', mod: '%', eq: '==', ne: '!=', lt: '<', le: '<=', gt: '>', ge: '>=', pi: 'π' };
  Object.keys(aliases).forEach(function(key, i) {
    functions[aliases[key]] = functions[key];
  })

  // Define some format macros
  var formatMacros = {
    lfld:   "$n_|$$x_|& |$n_|_rep|_left|>>",
    rfld:   "$n_|$$x_|& |$n_|_rep|_right|>>",
    dms:    "$$d_|_int|>>|°|$d_|_mins|&00|_right|>>|'|$d_|_secs|&00|_right|>>|\"",
    lat:    "$$lat_|_abs|$$ad_|_int|@[-90,90]|_clip|&  |_right|>>|°|$ad_|_mins|&00|_right|>>|'|$ad_|_secs|&00|_right|>>|\"|$lat_|_sign|#1|_add|S:: ::N",
    lon:    "$$lon_|_abs|$$ad_|_int|@[-180,180]|_wrap|&   |_right|>>|°|$ad_|_mins|&00|_right|>>|'|$ad_|_secs|&00|_right|>>|\"|$lon_|_sign|#1|_add|W:: ::E",
    latlon: "$$ll_|#0|_at|_lat|>>|, |$ll_|#1|_at|_lon|>>",
    error:  '&ERROR: function "|>>|$msg_|>>|&" not available!|>>'
  };

  // Macro function used to buffer parsed formats
  var macro = (function(mfts) {
    var mfuncs = {};
    return function(name) {
      var mfunc = mfuncs[name];
      if (!mfunc) {
        mfuncs[name] = mfunc = formatX(mfts[name]);
      }
      return mfunc;
    }
  })(formatMacros);


  function insertAt(s0, s1, p) {
    return s0.substr(0, p) + s1 + s0.substr(p + s1.length);
  }


  var formatX = function(fmt) {

    var ops = [];

    function evaluate(expression) {  
      var properties = expression.split('.');
      var result = properties.reduce(function(p, c) {
        return p ? p[c] : p;
      }, topLevel);
      return result instanceof Function ? result : function() { return result };
    }

    // Parse the format specifier
    function parse() {
      var toks = fmt.split(_sep);
      _sep = SEP;
      var ops = toks.map(function(tok) {
        var op;
        var c = tok.charAt(0);
        switch (c) {
        case VAR: // variable
          op = tok[1] === '$' ? { type: 'nam', name: tok.substr(1) } : { type: 'var', name: tok };
          break;
        case NUM: // number
          var f = parseFloat(tok.substr(1));
          op = { type: 'num', value: isNaN(f) ? evaluate(tok.substr(1)) : f };
          break;
        case STR: // string
          op = { type: 'str', value: tok.substr(1) };
          break;
        case JSN: // JSON
          op = { type: 'jsn', value: JSON.parse(tok.substr(1)) };
          break;
        case FUN: // function
          op = { type: 'fun', fun: tok.substr(1) };
          break;
        case OUT: // output
          op = { type: 'out' };
          break;
        case COM: // comment
          op = { type: 'com', text: tok.substr(1) };
          break;  
        default: // label
          op = { type: 'lab', labs: tok.split('::') };
          break;
        }
        return op;
      });
      return ops;
    };
    if (fmt) { ops = parse() };
  
    var format = function() {
      
      var args = Array.prototype.slice.call(arguments);
      var stack = []; // holds the currently used values
      var store = {}; // stores named variables
      var keys;

      format.getValue = function(key) {
        return store[key];
      };

      args.forEach(function(arg) {
        if (arg.key && arg.key.charAt(0) === '$') {
          store[arg.key] = arg.value;
        }
        else if ((keys = Object.keys(arg)) && keys.length === 1 && keys[0].charAt(0) === '$') {
          var key = keys[0];
          store[key] = arg[key];
        }
        else {
          stack.push(arg);
        }
      });
      
      return ops.reduce(function(p, c, i) {
        var out = '';
        switch (c.type) {
        case 'var':
          if (store[c.name] !== undefined) {
            stack.push(store[c.name]);
          }
          else {
            store[c.name] = stack.pop();
          }
          break;
        case 'nam':
          store[c.name] = stack[stack.length - 1];
          break;
        case 'num':
        case 'str':
        case 'jsn':
          stack.push(c.value);
          break;
        case 'fun':
          var fun = functions[c.fun] || evaluate(c.fun);
          if (fun) {
            var nargs = fun.length;
            var rv = fun.apply(fun, nargs == 0 ? null : stack.splice(-nargs));
            if (rv !== undefined) {
              stack.push(rv);
            }
          }
          else {
            // On our own mission
            throw (macro('error')(c.fun));
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

    }
      
    return format;
  }
  
  // Set separator
  formatX.setSeparator = function(_) {
    _sep = _;
  }

  // Add a new function
  formatX.setFunction = function(name, fun) {
    functions[name.substr(1)] = fun;
  };

  // Test a function
  formatX.testFunction = function(name) {
    var args = Array.prototype.slice.call(arguments);
    var fun = functions[name.substr(1)];
    if (fun) { return fun.apply(fun, args.splice(1 - args.length)); }
    else { console.error(macro('error')(ll)(name)); }
  }


  if (typeof exports !== "undefined") {
    exports.formatX = formatX;
  }
  else {
    topLevel.formatX = formatX;
  }
    
})(typeof window === "undefined" ? global : window);
