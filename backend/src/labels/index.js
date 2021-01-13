const { DEFAULT_LANGUAGE } = require('../config/index');
const USER_MESSAGES = require('./userMessages');

const MESSAGES = {
  ...USER_MESSAGES,
};

const getCustomLabel = (req, message) => {
  req.headers.userLanguage = req.headers.userLanguage || DEFAULT_LANGUAGE;

  return message[req.headers.userLanguage];
};

module.exports = {
  MESSAGES,
  getCustomLabel,
};
