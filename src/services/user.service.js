export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(id) {
    return await this.userRepository.getUserById(id);
  }
}
