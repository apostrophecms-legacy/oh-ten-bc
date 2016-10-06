var superBufferWrite = Buffer.prototype.write;

// Error: Buffer.write(string, encoding, offset[, length]) is no longer supported

Buffer.prototype.write = function(one, two, three, four) {
  if ((arguments.length === 3) && (typeof(arguments[1]) === 'string')) {
    return superBufferWrite.call(this, one, three, this.length - three, two);
  } else if ((arguments.length === 4) && (typeof(arguments[1]) === 'string')) {
    return superBufferWrite.call(this, one, three, four, two);
  } else {
    return superBufferWrite.apply(this, arguments);
  }
};
