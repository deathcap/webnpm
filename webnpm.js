
console.log('WebNPM starting');

var consoleWidget = require('console-widget')();
var ansi = require('ansi-to-html');
var asarray = require('asarray');
var shellasync = require('shellasync/global'); // adds ls(), cat(), etc. to global

consoleWidget.open();

var logConsole = function(args) {
  var array = asarray(args);
  var string = array.join('');

  //consoleWidget.log(string);

  var node = document.createElement('span'); // TODO: ansi to DOM nodes instead of serialized HTML?
  node.innerHTML = new ansi().toHtml(string); // TODO: try using ansi-html-stream instead

  consoleWidget.logNode(node);
};


// replacesif (res.resume) res.resume() fs.readFileSync
window.staticReadFileSync = function(path) {
  console.log('readFileSync', path);

  if (path.match(/^\/http:.*template.js$/)) {
    // Workaround getting '/file:/Users/admin/games/voxeljs/webnpm/template.js' TODO: underlying bug
    path = '/node_modules/browserify/node_modules/umd/template.js';
  }

  if (path in window.preloadedReadFileSyncs) {
    return window.preloadedReadFileSyncs[path];
  }

  console.log('file not found (add to preloadedFilenames list): ',path);
  return path
};

var preloadedReaddirSyncs = {
  '/node_modules/npm/node_modules/npm-registry-client/lib': [
    // node_modules/npm/node_modules/npm-registry-client/lib|perl -pe'chomp;$_="    \"$_\",\n"'
    "access.js",
    "adduser.js",
    "attempt.js",
    "authify.js",
    "deprecate.js",
    "dist-tags",
    "fetch.js",
    "get.js",
    "initialize.js",
    "publish.js",
    "request.js",
    "star.js",
    "stars.js",
    "tag.js",
    "unpublish.js",
    "whoami.js",
  ],
};

// TODO: https://github.com/substack/brfs/issues/19
window.staticReaddirSync = function(path) {
  console.log('readdirSync', path);
  if (path in preloadedReaddirSyncs)
    return preloadedReaddirSyncs[path];

  return [];
};

window.npmRegistryClientRequire = function(path) {
  console.log('npm-registry-client require',path);
  // ls node_modules/npm/node_modules/npm-registry-client/lib|perl -pe's/.js//g'|perl -pe'chomp;$_="  if (path===\"/node_modules/npm/node_modules/npm-registry-client/lib/$_.js\") return require(\"npm/node_modules/npm-registry-client/lib/$_\");\n"'
  if (path==="/node_modules/npm/node_modules/npm-registry-client/lib/access.js") return require("npm/node_modules/npm-registry-client/lib/access");
  if (path==="/node_modules/npm/node_modules/npm-registry-client/lib/adduser.js") return require("npm/node_modules/npm-registry-client/lib/adduser");
  if (path==="/node_modules/npm/node_modules/npm-registry-client/lib/attempt.js") return require("npm/node_modules/npm-registry-client/lib/attempt");
  if (path==="/node_modules/npm/node_modules/npm-registry-client/lib/authify.js") return require("npm/node_modules/npm-registry-client/lib/authify");
  if (path==="/node_modules/npm/node_modules/npm-registry-client/lib/deprecate.js") return require("npm/node_modules/npm-registry-client/lib/deprecate");
  //if (path==="/node_modules/npm/node_modules/npm-registry-client/lib/dist-tags.js") return require("npm/node_modules/npm-registry-client/lib/dist-tags");
  if (path==="/node_modules/npm/node_modules/npm-registry-client/lib/fetch.js") return require("npm/node_modules/npm-registry-client/lib/fetch");
  if (path==="/node_modules/npm/node_modules/npm-registry-client/lib/get.js") return require("npm/node_modules/npm-registry-client/lib/get");
  if (path==="/node_modules/npm/node_modules/npm-registry-client/lib/initialize.js") return require("npm/node_modules/npm-registry-client/lib/initialize");
  if (path==="/node_modules/npm/node_modules/npm-registry-client/lib/publish.js") return require("npm/node_modules/npm-registry-client/lib/publish");
  if (path==="/node_modules/npm/node_modules/npm-registry-client/lib/request.js") return require("npm/node_modules/npm-registry-client/lib/request");
  if (path==="/node_modules/npm/node_modules/npm-registry-client/lib/star.js") return require("npm/node_modules/npm-registry-client/lib/star");
  if (path==="/node_modules/npm/node_modules/npm-registry-client/lib/stars.js") return require("npm/node_modules/npm-registry-client/lib/stars");
  if (path==="/node_modules/npm/node_modules/npm-registry-client/lib/tag.js") return require("npm/node_modules/npm-registry-client/lib/tag");
  if (path==="/node_modules/npm/node_modules/npm-registry-client/lib/unpublish.js") return require("npm/node_modules/npm-registry-client/lib/unpublish");
  if (path==="/node_modules/npm/node_modules/npm-registry-client/lib/whoami.js") return require("npm/node_modules/npm-registry-client/lib/whoami");
  console.log('not found, add to npmRegistryClientRequire:',path);
};

window.npmCommandRequire = function(path) {
  console.log('npm command require',path);
  // ls node_modules/npm/lib/|perl -pe's/.js//g'|perl -pe'chomp;$_="  if (path===\"/node_modules/npm/lib/$_.js\") return require(\"npm/lib/$_\");\n"'
  if (path==="/node_modules/npm/lib/access.js") return require("npm/lib/access");
  if (path==="/node_modules/npm/lib/adduser.js") return require("npm/lib/adduser");
  if (path==="/node_modules/npm/lib/bin.js") return require("npm/lib/bin");
  if (path==="/node_modules/npm/lib/bugs.js") return require("npm/lib/bugs");
  if (path==="/node_modules/npm/lib/build.js") return require("npm/lib/build");
  if (path==="/node_modules/npm/lib/cache.js") return require("npm/lib/cache");
  if (path==="/node_modules/npm/lib/cache.js") return require("npm/lib/cache");
  if (path==="/node_modules/npm/lib/completion.js") return require("npm/lib/completion");
  if (path==="/node_modules/npm/lib/config.js") return require("npm/lib/config");
  if (path==="/node_modules/npm/lib/config.js") return require("npm/lib/config");
  if (path==="/node_modules/npm/lib/dedupe.js") return require("npm/lib/dedupe");
  if (path==="/node_modules/npm/lib/deprecate.js") return require("npm/lib/deprecate");
  if (path==="/node_modules/npm/lib/dist-tag.js") return require("npm/lib/dist-tag");
  if (path==="/node_modules/npm/lib/docs.js") return require("npm/lib/docs");
  if (path==="/node_modules/npm/lib/edit.js") return require("npm/lib/edit");
  if (path==="/node_modules/npm/lib/explore.js") return require("npm/lib/explore");
  if (path==="/node_modules/npm/lib/faq.js") return require("npm/lib/faq");
  if (path==="/node_modules/npm/lib/get.js") return require("npm/lib/get");
  if (path==="/node_modules/npm/lib/help-search.js") return require("npm/lib/help-search");
  if (path==="/node_modules/npm/lib/help.js") return require("npm/lib/help");
  if (path==="/node_modules/npm/lib/init.js") return require("npm/lib/init");
  if (path==="/node_modules/npm/lib/install.js") return require("npm/lib/install");
  if (path==="/node_modules/npm/lib/link.js") return require("npm/lib/link");
  if (path==="/node_modules/npm/lib/ls.js") return require("npm/lib/ls");
  if (path==="/node_modules/npm/lib/npm.js") return require("npm/lib/npm");
  if (path==="/node_modules/npm/lib/outdated.js") return require("npm/lib/outdated");
  if (path==="/node_modules/npm/lib/owner.js") return require("npm/lib/owner");
  if (path==="/node_modules/npm/lib/pack.js") return require("npm/lib/pack");
  if (path==="/node_modules/npm/lib/prefix.js") return require("npm/lib/prefix");
  if (path==="/node_modules/npm/lib/prune.js") return require("npm/lib/prune");
  if (path==="/node_modules/npm/lib/publish.js") return require("npm/lib/publish");
  if (path==="/node_modules/npm/lib/rebuild.js") return require("npm/lib/rebuild");
  if (path==="/node_modules/npm/lib/repo.js") return require("npm/lib/repo");
  if (path==="/node_modules/npm/lib/restart.js") return require("npm/lib/restart");
  if (path==="/node_modules/npm/lib/root.js") return require("npm/lib/root");
  if (path==="/node_modules/npm/lib/run-script.js") return require("npm/lib/run-script");
  if (path==="/node_modules/npm/lib/search.js") return require("npm/lib/search");
  if (path==="/node_modules/npm/lib/set.js") return require("npm/lib/set");
  if (path==="/node_modules/npm/lib/shrinkwrap.js") return require("npm/lib/shrinkwrap");
  if (path==="/node_modules/npm/lib/star.js") return require("npm/lib/star");
  if (path==="/node_modules/npm/lib/stars.js") return require("npm/lib/stars");
  if (path==="/node_modules/npm/lib/start.js") return require("npm/lib/start");
  if (path==="/node_modules/npm/lib/stop.js") return require("npm/lib/stop");
  if (path==="/node_modules/npm/lib/substack.js") return require("npm/lib/substack");
  if (path==="/node_modules/npm/lib/tag.js") return require("npm/lib/tag");
  if (path==="/node_modules/npm/lib/test.js") return require("npm/lib/test");
  if (path==="/node_modules/npm/lib/unbuild.js") return require("npm/lib/unbuild");
  if (path==="/node_modules/npm/lib/uninstall.js") return require("npm/lib/uninstall");
  if (path==="/node_modules/npm/lib/unpublish.js") return require("npm/lib/unpublish");
  if (path==="/node_modules/npm/lib/update.js") return require("npm/lib/update");
  //if (path==="/node_modules/npm/lib/utils.js") return require("npm/lib/utils");
  if (path==="/node_modules/npm/lib/version.js") return require("npm/lib/version");
  if (path==="/node_modules/npm/lib/view.js") return require("npm/lib/view");
  if (path==="/node_modules/npm/lib/visnup.js") return require("npm/lib/visnup");
  if (path==="/node_modules/npm/lib/whoami.js") return require("npm/lib/whoami");
  if (path==="/node_modules/npm/lib/xmas.js") return require("npm/lib/xmas");
  console.log('no such npm command module, update npmCommandRequire:',path);
}

var fs = require('fs');

fs.statSync = function(file) {
  return {
    isFile: function() { return true; },
    isFIFO: function() { return false; },
    isDirectory: function() { return false; },
  };
};

fs.unlinkSync = function(path) {
  console.log('unlinkSync', path);
  if (path === undefined) return; // ? fs-write-stream-atomic cleanupSync calls with undefined
  // this will have to do
  fs.unlink(path, function(err) {
    console.log('unlinkSync completed',path,err);
  });
};

fs.existsSync = function(path) {
  console.log('exists?', path);
  return true; // TODO
};

fs.readdirSync = window.staticReaddirSync;

// TODO: browserify-fs WriteStream
var stream = require('stream');
fs.WriteStream = stream.Writable;

fs.mkdir('/tmp', function(err) {
  if (err) {
    console.log('mkdir /tmp failed:',err);
  }

  main(fs);
});

function main() {
  global.fs = require('fs');

  var browserify = require('browserify');
  global.browserify = browserify;

  var Writable = require('stream').Writable;

  process.stdout = new Writable();
  process.stderr = new Writable();

  process.stdout.write = function() {
    console.log.apply(console, arguments);
    logConsole(arguments);
  };
  process.stderr.write = function() {
    console.warn.apply(console, arguments);
    logConsole(arguments);
  };

  process.exit = function(code) {
    logConsole('Process exited ',code); // not really
  };

  process.binding = function() {
    return {fs: ''}
  };

  process.argv = ['/']; // our executable, because it exists
  process.execPath = '/'; // matches argv[0]

  process.version = 'v0.10.21';
  process.versions = {
    node: process.version,
    webnpm: '0.0.0',
    // TODO: npm.version, etc.
  };

  var npm = require('npm');

  global.npm = npm;

  var config = {
    // until https://github.com/npm/npm-registry-couchapp/issues/108#issuecomment-73352201 add support for CORS headers
    // from https://github.com/Rob--W/cors-anywhere/
    // fails with 'A wildcard '*' cannot be used in the 'Access-Control-Allow-Origin' header when the credentials flag is true.
    // Origin 'http://localhost:9966' is therefore not allowed access.' withCredentials false, then it works
    //registry: 'http://cors-anywhere.herokuapp.com/http://registry.npmjs.org',
    registry: 'http://cors.maxogden.com/http://registry.npmjs.org',
    // from https://github.com/zeke/npm-registry-cors-proxy, but it does not allow OPTIONS - '404 Not Found Cannot OPTIONS /voxel-engine'
    //registry: 'http://npm-registry-cors-proxy.herokuapp.com',

    // npm.config.get('argv').cooked requires nopt parsing, used by faq and help
    // TODO: call npm-cli https://github.com/deathcap/webnpm/issues/8
    argv: {cooked: []},
  };

  npm.load(config, function(err) {
    if (err) {
      console.log('npm load failed:',err);
      return;
    }

    console.log('WebNPM loaded. Try browserify() or npm.commands.*()');
  });

  // relevant bits for cli
  var nopt = require('./node_modules/npm/node_modules/nopt');
  var npmconf = require('./node_modules/npm/lib/config/core.js');
  var configDefs = npmconf.defs;
  var shorthands = configDefs.shorthands;
  var types = configDefs.types;
  var errorHandler = require('./node_modules/npm/lib/utils/error-handler.js');

  global.npm_cli = function() {
    // Call the NPM command-line interface with the given function arguments
    process.argv = asarray(arguments); // for .slice, on Array but not arguments
    //require('npm/cli.js'); // this only works once :( TODO
    // We have to do our own option parsing
    var conf = nopt(types, shorthands);
    npm.argv = conf.argv.remain;
    if (npm.deref(npm.argv[0])) npm.command = npm.argv.shift();
    else config.usage = true;

    npm.commands[npm.command](npm.argv, errorHandler);
    // TODO: still need to reset some state here..
    // "Callback called more than once." if rerun with another command
  };
}
