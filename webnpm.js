
// replaces fs.readFileSync
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
}

// TODO: https://github.com/substack/brfs/issues/19
window.staticReaddirSync = function(path) {
  console.log('readdirSync', path);

  return [];
};

window.npmCommandRequire = function(path) {
  console.log('npm require',path);
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

var webfs = require('web-fs');

// https://github.com/mmckegg/web-fs
navigator.webkitPersistentStorage.requestQuota(1024*1024, function(grantedBytes) {
  console.log('granted bytes',grantedBytes);
  window.webkitRequestFileSystem(PERSISTENT, grantedBytes, function(result) {
    console.log('requested filesystem', result);
    global.webfs = webfs(result.root);
    var fs = global.webfs;
    
    fs.statSync = function(file) {
      return {
        isFile: function() { return true; },
        isFIFO: function() { return false; },
      };
    };

    fs.readdirSync = window.staticReaddirSync;

    fs.mkdir('/node_modules', function() {
      console.log('created /node_modules');
      fs.mkdir('/node_modules/npm', function() {
        console.log('created /node_modules/npm');

        main(fs);
      });
    });
  });
});


function main() {
  var browserify = require('browserify');
  global.browserify = browserify;

  var Writable = require('stream').Writable;

  process.stdout = new Writable();
  process.stderr = new Writable();

  process.stdout.write = function() {
    console.log.apply(console, arguments);
  };
  process.stderr.write = function() {
    console.warn.apply(console, arguments);
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

  var config = {};

  npm.load(config, function(err) {
    if (err) {
      console.log('npm load failed:',err);
      return;
    }

    console.log('WebNPM loaded. Try browserify() or npm.commands.*()');
  });
}
