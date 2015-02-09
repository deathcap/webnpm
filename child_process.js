
// stub http://nodejs.org/api/child_process.html

module.exports = {
  // module-deps 3.6.4 imports child_process.spawn, even though it doesn't need it:
  // (can remove after) https://github.com/substack/module-deps/pull/66
  spawn: function(command, args, options) {
           console.log('child_process.spawn ignored:',command,args,options);
         }
};

