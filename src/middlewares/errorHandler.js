import { STATUS_CODES } from '../utils/constants.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  return res
    .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
    .send({ success: false, message: err.message });
};
