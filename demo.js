var browserify = require('browserify');
var brfs = require('brfs');
var through = require('through');
var fs = require('fs');

var browserify_builtins = require('browserify/lib/builtins');
browserify_builtins.child_process = 'child_process.js';
browserify_builtins.fs = require.resolve('browserify-fs'); // TODO: what is the api equivalent of cli -r fs:browserify-fs?
browserify_builtins['graceful-fs'] = browserify_builtins.fs;
browserify_builtins['request'] = require.resolve('browser-request');

var b = browserify();

//b.require('browserify-fs', {expose:'fs'});

//b.transform('brfs');

var textReplacements = [
  [/require\.resolve/g, 'require'], // TODO: what is require.resolve for browserify?

  // semi-dynamic fs.readFileSync()
  [/fs\.readFileSync/g, 'window.staticReadFileSync'],
  [/require\('fs'\)\.readFileSync/g, 'window.staticReadFileSync'],

  // semi-dynamic require()

  // node_modules/npm/lib/npm.js
  [/require\(__dirname\+"\/"\+a\+"\.js"\)/g, 'window.npmCommandRequire(__dirname+"/"+a+".js")'],

  // npm/node_modules/npm-registry-client/index.js
  [/client\[name\] = require\(entry\)/g, 'client[name] = window.npmRegistryClientRequire(entry)'],


  // npm/node_modules/npm-registry-client/lib/request.js
  // workaround https://github.com/iriscouch/browser-request/pull/44 browser-request cannot request URL objects
  [/(var req = request\(opts, decodeResponseBody\(done\)\))/g, 'opts.url = opts.url.href; $1'],
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

