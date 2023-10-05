import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

interface IUser {
  title: String;
  age: String;
}

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/read')
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Post('/create')
  async createUser(@Body() user: IUser) {
    return await this.usersService.createUser(user);
  }

  @Delete('delete/:id')
  async deleteUser(@Param() user) {
    return await this.usersService.deleteUser(user.id);
  }

  @Put('update/:id')
  async updateUser(@Param() user_id, @Body() userInfo) {
    return await this.usersService.updateUser(user_id, userInfo);
  }
}
