const { program } = require('commander');
const { parseAction, parseShift } = require('./src/helpers/parse');
const { statusMessage } = require('./src/constants/error');
const { App } = require('./src/app');

process.on('exit', code => {
  return console.log(`Exit with code ${code}`);
});

process.on('uncaughtException', error => {
  const errorCode = error.toString().substring(7);

  if (statusMessage[errorCode]) {
    console.error(statusMessage[errorCode]);
  }
  /* eslint no-process-exit: "off"*/
  process.exit(errorCode);
});

program
  .storeOptionsAsProperties(false)
  .option('-s, --shift <type>', 'a shift', parseShift)
  .option('-i, --input <type>', 'an input file')
  .option('-o, --output <type>', 'an output file')
  .option('-a, --action <type>', 'an action encode/decode', parseAction);

program.parse(process.argv);

const app = new App(program.opts());
app.run();
