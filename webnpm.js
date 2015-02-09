
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

process.argv = ['npm'];

var npm = require('npm');
console.log('npm=',npm);

npm.load();
npm.commands.install();
