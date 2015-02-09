var browserify = require('browserify');

require('browserify/lib/builtins').fs = 'create-webfs.js'; // TODO: find a better way to replace this module

var b = browserify();
b.add('./demo.js');
b.bundle().pipe(process.stdout);

