const { Transform } = require('stream');
const { StringDecoder } = require('string_decoder');
const { ENCODE } = require('../constants/actions');

class CaesarTransform extends Transform {
  constructor(options) {
    super(options);

    this._decoder = new StringDecoder('utf-8');
    this.shift =
      options.action === ENCODE ? options.shift : (26 - options.shift) % 26;
  }

  _transform(chunk, encoding, callback) {
    if (encoding === 'buffer') {
      chunk = this._decoder.write(chunk);
    }

    chunk = this.caesarShift(chunk);

    callback(null, chunk);
  }

  // https://gist.github.com/EvanHahn/2587465
  caesarShift(str) {
    let output = '';

    for (let i = 0; i < str.length; i++) {
      let c = str[i];

      if (c.match(/[a-z]/i)) {
        const code = str.charCodeAt(i);

        if (code >= 65 && code <= 90) {
          c = String.fromCharCode(((code - 65 + this.shift) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          c = String.fromCharCode(((code - 97 + this.shift) % 26) + 97);
        }
      }

      output += c;
    }

    return `${output}`;
  }
}

module.exports = {
  CaesarTransform
};
