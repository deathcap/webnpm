var webfs = require('web-fs');

// instantiate an instance, because web-fs doesn't, but fs does
var fs = webfs();

fs.statSync = function(file) {
  return {
    isFile: function() { return false; },
    isFIFO: function() { return false; },
  };
};

module.exports = fs;
