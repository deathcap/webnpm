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
var preloadedFilenames = [
  'node_modules/browserify/node_modules/umd/template.js',
  'node_modules/browserify/node_modules/browser-pack/_prelude.js',
  'node_modules/npm/package.json',
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


b.add('./webnpm.js');

var preloadedReadFileSyncs = {};
for (var i = 0; i < preloadedFilenames.length; i += 1) {
  var path = preloadedFilenames[i];
  preloadedReadFileSyncs['/' + path] = JSON.stringify(fs.readFileSync(path, 'utf8'));
}

process.stdout.write('window.preloadedReadFileSyncs = ' + JSON.stringify(preloadedReadFileSyncs) + '\n;');

b.bundle().pipe(process.stdout);

