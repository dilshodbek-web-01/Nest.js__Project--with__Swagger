import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CurrentUser } from 'src/auth/userInfo/getUserDecorator';
import { FruitsService } from './fruits.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

interface ICar {
  title: String;
  price: String;
}

@ApiBearerAuth()
@ApiTags('fruits')
@Controller('/fruits')
@UseGuards(AuthGuard)
export class FruitsController {
  constructor(private fruitsService: FruitsService) {}

  @Get('/read')
  async getFruits(@CurrentUser() userInfo) {
    return await this.fruitsService.getFruits(userInfo);
  }

  @Get('/read/:id')
  async getFruit(@Param() fruit, @CurrentUser() userInfo) {
    return await this.fruitsService.getFruit(fruit, userInfo);
  }

  @Post('/create')
  async createFruit(@Body() fruitInfo: ICar, @CurrentUser() userInfo) {
    return await this.fruitsService.createFruit(fruitInfo, userInfo);
  }

  @Delete('delete/:id')
  async deleteFruit(@Param() fruit, @CurrentUser() userInfo) {
    return await this.fruitsService.deleteFruit(fruit, userInfo);
  }

  @Put('update/:id')
  async updateFruit(@Param() fruit, @Body() fruitInfo, @CurrentUser() userInfo) {
    return await this.fruitsService.updateFruit(fruit, fruitInfo, userInfo);
  }
}
