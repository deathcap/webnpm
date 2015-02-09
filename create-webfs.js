var webfs = require('web-fs');

// instantiate an instance, because web-fs doesn't, but fs does
module.exports = webfs();
