import { User } from '../models/user.model.js';

export class UserRepository {
  async getUserById(id) {
    return await User.findByPk(id);
  }
}
