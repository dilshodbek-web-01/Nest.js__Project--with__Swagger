import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repo';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async getUserByEmail(email) {
    return await this.authRepository.getUserByEmail(email);
  }

  async register(userInfo) {
    try {
      let foundedUser = await this.authRepository.getUserByEmail(
        userInfo.email,
      );

      if (foundedUser[0]) {
        return new ConflictException('User already exists!');
      }

      userInfo.password = await bcrypt.hash(userInfo.password, 10);

      return await this.authRepository.register(userInfo);
    } catch (error) {
      console.log(error);
      return new InternalServerErrorException();
    }
  }

  async login(userInfo) {
    let result = await this.authRepository.login(userInfo);

    if (result.length == 0) {
      return {
        message: 'User not found!',
      };
    }

    result = result[0];

    let checkPwd = await bcrypt.compare(userInfo.password, result.password);
    if (!checkPwd) {
      return {
        message: 'Password invalid!',
      };
    }

    let token = await this.jwtService.sign({ id: result.id });
    return {
      message: 'OK',
      token,
    };
  }
}
