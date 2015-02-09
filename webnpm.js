
var Writable = require('stream').Writable;

process.stdout = new Writable();
process.stderr = new Writable();

process.stdout.write = function() {
  console.log('STDOUT', arguments);
};
process.stderr.write = function() {
  console.log('STDERR', arguments);
};


process.binding = function() {
  return {fs: ''}
};

process.argv = ['npm'];

//var webfs = require('web-fs');

var npm = require('npm');

npm.load();
npm.commands.install();
