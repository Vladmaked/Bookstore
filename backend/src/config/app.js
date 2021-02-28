const { APP_PORT = 3000, NODE_ENV = 'development', DEFAULT_LANGUAGE = 'uk' } = process.env;
const IS_IN_PROD = NODE_ENV === 'production';
const DEFAULT_PAGE_SIZE = 1000;

module.exports = {
  APP_PORT,
  NODE_ENV,
  DEFAULT_LANGUAGE,
  IS_IN_PROD,
  DEFAULT_PAGE_SIZE,
};
