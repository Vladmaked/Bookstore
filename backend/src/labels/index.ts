import { strict } from 'assert';
import { Request } from 'express';
import { DEFAULT_LANGUAGE } from '../config';
import { USER_MESSAGES } from './userMessages';

export * from './userMessages';

const MESSAGES = {
  ...USER_MESSAGES,
};

export const getCustomLabel = (req: any, message: any) => {
  req.headers.userLanguage = req.headers.userLanguage || DEFAULT_LANGUAGE;

  return message[req.headers.userLanguage];
};
