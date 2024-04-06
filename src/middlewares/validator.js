import { validationResult } from 'express-validator';
import { STATUS_CODES } from '../utils/constants.js';

export const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res
    .status(STATUS_CODES.BAD_REQUEST)
    .json({ errors: errors.array(), success: false });
};
