import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repo';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUsers() {
    return this.usersRepository.getUsers();
  }

  async createUser(user) {
    let newUser = this.usersRepository.createUser(user);

    return {
      message: 'Create user',
    };
  }

  async deleteUser(id) {
    let foundedUser = this.usersRepository.getOne(id);

    if (!foundedUser) {
      return { message: 'User not found !!!' };
    }
    this.usersRepository.deleteUser(id);
    return {
      message: 'User deleted!',
    };
  }

  async updateUser(user_id, userInfo) {
    let foundedUser = this.usersRepository.getOne(user_id.id);

    if (!foundedUser) {
      return {
        message: 'User not found!',
      };
    }

    let res = this.usersRepository.updateUser(user_id.id, userInfo);

    return {
      message: 'user updated!',
    };
  }
}
