var version = process.version;

// Don't try to patch 0.10 to call newer APIs that are not there
if (!version.match(/^0\.10/)) {

  // Error: Buffer.write(string, encoding, offset[, length]) is no longer supported
  var superBufferWrite = Buffer.prototype.write;
  Buffer.prototype.write = function(one, two, three, four) {
    if ((arguments.length === 3) && (typeof(arguments[1]) === 'string')) {
      return superBufferWrite.call(this, one, three, this.length - three, two);
    } else if ((arguments.length === 4) && (typeof(arguments[1]) === 'string')) {
      return superBufferWrite.call(this, one, three, four, two);
    } else {
      return superBufferWrite.apply(this, arguments);
    }
  };

  // Error: Cannot find module '../build/Release/bson'

  // This is just a warning, the pure JS driver is almost as fast and in 2.x they
  // discontinued the C++ driver altogether. So stop spamming at startup!

  var superConsoleLog = console.log;
  console.dir = function(obj) {
    var s = require('util').inspect(obj);
    if (s.indexOf("Cannot find module '../build/Release/bson'") !== -1) {
      return;
    }
    console.log(s);
  };

  var superConsoleError = console.error;
  console.error = function(s) {
    if (s.indexOf("js-bson: Failed to load c++ bson extension, using pure JS version") !== -1) {
      return;
    }
    return superConsoleError.apply(console, arguments);
  };
}
