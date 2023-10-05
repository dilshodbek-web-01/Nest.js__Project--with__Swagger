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
import { CurrentUser } from 'src/auth/userInfo/getUserDecorator';
import { CarsService } from './cars.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CarIdDto, CreateOrUpdateDto, CurrentUserDto } from './dto/cars.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiBearerAuth()
@ApiTags('cars')
@Controller('/cars')
@UseGuards(AuthGuard)
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get('/read')
  async getCars(@CurrentUser() userInfo: CurrentUserDto) {
    return await this.carsService.getCars(userInfo);
  }

  @Get('/read/:id')
  async getCar(
    @Param() car: CarIdDto,
    @CurrentUser() userInfo: CurrentUserDto,
  ) {
    return await this.carsService.getCar(car, userInfo);
  }

  @Post('/create')
  async createCar(
    @Body() carInfo: CreateOrUpdateDto,
    @CurrentUser() userInfo: CurrentUserDto,
  ) {
    return await this.carsService.createCar(carInfo, userInfo);
  }

  @Delete('delete/:id')
  async deleteCar(
    @Param() car: CarIdDto,
    @CurrentUser() userInfo: CurrentUserDto,
  ) {
    return await this.carsService.deleteCar(car, userInfo);
  }

  @Put('update/:id')
  async updateCar(
    @Param() car: CarIdDto,
    @Body() carInfo: CreateOrUpdateDto,
    @CurrentUser() userInfo: CurrentUserDto,
  ) {
    return await this.carsService.updateCar(car, carInfo, userInfo);
  }
}
