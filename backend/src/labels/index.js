const { DEFAULT_LANGUAGE } = require('../config/index');
const USER_MESSAGES = require('./userMessages');
const CATEGORY_LABELS = require('./categoryLabels');

const MESSAGES = {
  ...USER_MESSAGES,
  ...CATEGORY_LABELS,
};

const getCustomLabel = (req, message) => {
  req.headers.userLanguage = req.headers.userLanguage || DEFAULT_LANGUAGE;

  return message[req.headers.userLanguage];
};

module.exports = {
  MESSAGES,
  getCustomLabel,
};
