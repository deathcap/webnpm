var browserify = require('browserify');
var brfs = require('brfs');
var through = require('through');
var fs = require('fs');

require('browserify/lib/builtins').fs = 'create-webfs.js'; // TODO: find a better way to replace this module

var b = browserify();

//b.transform('brfs');

var textReplacements = [
  [/require\.resolve/g, 'require'], // TODO: what is require.resolve for browserify?
  [/fs\.readFileSync/g, 'window.staticReadFileSync'],
  [/require\('fs'\)\.readFileSync/g, 'window.staticReadFileSync'],
];

// Included file data for staticReadFileSync; this is similar to
// brfs's fs.readFileSync transclusion but ours is looked up dynamically,
// because brfs can only replace files from static source code analysis.
var preloadedReadFileSyncs = {
  '/node_modules//browserify/node_modules/umd/template.js': JSON.stringify(fs.readFileSync('node_modules//browserify/node_modules/umd/template.js', 'utf8')),
  '/node_modules/browserify/node_modules/browser-pack/_prelude.js': JSON.stringify(fs.readFileSync('node_modules/browserify/node_modules/browser-pack/_prelude.js', 'utf8')),
  '/node_modules/npm/package.json': JSON.stringify(fs.readFileSync('node_modules/npm/package.json', 'utf8')),
};

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


b.add('./webnpm.js');
process.stdout.write('window.preloadedReadFileSyncs = ' + JSON.stringify(preloadedReadFileSyncs) + '\n;');

b.bundle().pipe(process.stdout);

