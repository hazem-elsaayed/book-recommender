import { STATUS_CODES } from '../utils/constants.js';

export const validateUser = (userRepository) => async (req, res, next) => {
  const { user_id } = req.body;
  const user = await userRepository.getUserById(user_id);
  if (!user) {
    return res
      .status(STATUS_CODES.NOT_FOUND)
      .send({ error: 'User not found', success: false });
  }
  req.user = user;
  next();
};
