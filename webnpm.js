
// replaces fs.readFileSync
window.staticReadFileSync = function(path) {
  console.log('readFileSync', path);

  if (path.match(/^\/file:.*template.js$/)) {
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
  console.log('browserify=',browserify);

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

  var npm = require('npm');
  console.log('npm=',npm);

  global.npm = npm;

  var config = {};

  // browserify doesn't pickup dynamic require:
  //  var cmd = require(__dirname+"/"+a+".js")
  // so be explicit about it
  require('npm/lib/version.js');

  npm.load(config, function(err) {
    if (err) {
      console.log('npm load failed:',err);
      return;
    }

    npm.commands.version([], function(err, data) {
      console.log('command returned:',err,data);
    });
  });
}
