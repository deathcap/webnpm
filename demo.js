var browserify = require('browserify');
var brfs = require('brfs');
var through = require('through');
var fs = require('fs');

require('browserify/lib/builtins').fs = 'create-webfs.js'; // TODO: find a better way to replace this module

var b = browserify();

var textReplacements = [
  [/rfile\('.\/template.js'\)/g, JSON.stringify(fs.readFileSync('node_modules//browserify/node_modules/umd/template.js', 'utf8'))],
  [/fs\.readFileSync\(defaultPreludePath, 'utf8'\)/g, JSON.stringify(fs.readFileSync('node_modules/browserify/node_modules/browser-pack/_prelude.js', 'utf8'))],
  [/require\.resolve/g, 'require'],
];

// directly include rfile TODO: use brfs, but it replaces fs.readFileSync
b.transform(function(s) {
  var data = '';
  return through(write, end);

  function write(buf) { data += buf; }
  function end() {
    for (var i = 0; i < textReplacements.length; i += 1) {
      var regex = textReplacements[i][0];
      var replacement = textReplacements[i][1];

      data  = data.replace(regex, replacement);
    }

    this.queue(data);
    this.queue(null);
  };
}, { global: true });

b.transform('brfs');

b.add('./webnpm.js');
b.bundle().pipe(process.stdout);

