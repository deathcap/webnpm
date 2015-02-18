var browserify = require('browserify');
var brfs = require('brfs');
var through = require('through');
var fs = require('fs');

var browserify_builtins = require('browserify/lib/builtins');
browserify_builtins.fs = require.resolve('browserify-fs'); // TODO: what is the api equivalent of cli -r fs:browserify-fs?
browserify_builtins['graceful-fs'] = browserify_builtins.fs;

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

  // node_modules/npm/node_modules/request somewhere
  // Disable credentials in XHR for CORS proxies with Access-Control-Allow-Origin: *
  // TODO: surely a better way to make this change
  [/params.withCredentials = true/g, 'params.withCredentials = false'],

  // download tarball URLs also through CORS proxy TODO: more general fix, please
  [/url\.parse\(dist\.tarball\)/g, 'url.parse(("http://cors.maxogden.com/"+dist.tarball))'],

  // node_modules/npm/lib/cache/update-index.js https://github.com/deathcap/webnpm/issues/7
  // full path for CORS proxifying URL with search
  [/\/-\/all/g, '/http://registry.npmjs.org/-/all'],

  // node_modules/npm/node_modules/npm-registry-client/lib/fetch.js
  // workaround https://github.com/substack/http-browserify/issues/81 Response inherits from Stream instead of Stream.Readable
  // note: the 'request' module has the same workaround
  // TODO: report fix upstream?
  [/          \/\/ Work around bug in node v0\.10\.0 where the CryptoStream\s+\/\/ gets stuck and never starts reading again\.\s+res\.resume\(\)/g, 'if (res.resume) res.resume()'],

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

