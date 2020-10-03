const status = {
  EMPTY_ACTION: 1,
  INVALID_ACTION: 2,
  INVALID_SHIFT: 3,
  EMPTY_SHIFT: 4
};

const statusMessage = {
  [status.EMPTY_ACTION]: 'There is no action',
  [status.INVALID_ACTION]: 'Invalid action',
  [status.INVALID_SHIFT]: 'Invalid shift',
  [status.EMPTY_SHIFT]: 'There is no shift'
};

module.exports = Object.assign(
  {},
  {
    status,
    statusMessage
  }
);
