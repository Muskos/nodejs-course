const { status } = require('../constants/error');
const { actions } = require('../constants/actions');

function parseShift(value) {
  const shift = parseInt(value, 10);

  if (isNaN(shift)) {
    throw new Error(status.INVALID_SHIFT);
  }

  return value;
}

function parseAction(value) {
  if (!actions.includes(value)) {
    throw new Error(status.INVALID_ACTION);
  }

  return value;
}

module.exports = Object.assign(
  {},
  {
    parseShift,
    parseAction
  }
);
