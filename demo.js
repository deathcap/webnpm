var browserify = require('browserify');
var brfs = require('brfs');
var through = require('through');

require('browserify/lib/builtins').fs = 'create-webfs.js'; // TODO: find a better way to replace this module

var b = browserify();

// directly include rfile TODO: use brfs, but it replaces fs.readFileSync
b.transform(function(s) {
  var data = '';
  return through(write, end);

  function write(buf) { data += buf; }
  function end() {
    var fs = require('fs');
    var s = data;
    var includedFile = fs.readFileSync('node_modules//browserify/node_modules/umd/template.js', 'utf8');
    s = s.replace(/rfile\('.\/template.js'\)/, JSON.stringify(includedFile));
    this.queue(s);
    this.queue(null);
  };
}, { global: true });

b.transform('brfs');

b.add('./webnpm.js');
b.bundle().pipe(process.stdout);

