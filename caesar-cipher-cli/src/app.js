const { pipeline } = require('stream');
const { status } = require('./constants/error');
const { CaesarTransform } = require('./helpers/caesarTransform');

const fs = require('fs');
class App {
  constructor(options) {
    this.checkOptions(options);
    this.shift = parseInt(options.shift, 10);
    this.input = options.input;
    this.output = options.output;
    this.action = options.action;
  }
  checkOptions(options) {
    if (!options.shift) {
      throw new Error(status.EMPTY_SHIFT);
    }
    if (!options.action) {
      throw new Error(status.EMPTY_ACTION);
    }
  }

  run() {
    pipeline(
      this.input ? fs.createReadStream(this.input) : process.stdin,
      new CaesarTransform({
        shift: this.shift,
        action: this.action
      }),
      this.output
        ? fs.createWriteStream(this.output, { flags: 'a' })
        : process.stdout,
      err => {
        if (err) {
          throw new Error(err);
        }
      }
    );
  }
}

module.exports = {
  App
};
