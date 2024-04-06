import { UserRepository } from '../repositories/user.repository.js';
import { STATUS_CODES } from '../utils/constants.js';

export const validateUser = async (req, res, next) => {
  const { user_id } = req.body;
  const userRepository = new UserRepository();
  const user = await userRepository.getUserById(user_id);
  if (!user) {
    return res
      .status(STATUS_CODES.NOT_FOUND)
      .send({ error: 'User not found', success: false });
  }
  req.user = user;
  next();
};
