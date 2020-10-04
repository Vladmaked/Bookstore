export const { APP_PORT = 3000, NODE_ENV = 'development', DEFAULT_LANGUAGE = 'uk' } = process.env;

export const IS_IN_PROD = NODE_ENV === 'production';
