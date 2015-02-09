
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
};

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

var npm = require('npm');
console.log('npm=',npm);

npm.load();
npm.commands.install();
