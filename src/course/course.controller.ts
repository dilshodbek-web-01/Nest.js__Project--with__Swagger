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
import { CourseService } from './course.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';


interface ICourse {
  title: string;
  price: string;
}

@ApiBearerAuth()
@ApiTags('courses')
@Controller('/courses')
@UseGuards(AuthGuard)
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get('/read')
  async getCourses(@CurrentUser() userInfo) {
    return await this.courseService.getCourses(userInfo);
  }

  @Get('/read/:id')
  async getCourse(@Param() course, @CurrentUser() userInfo) {
    return await this.courseService.getCourse(course, userInfo);
  }

  @Post('/create')
  async createCourse(@Body() course: ICourse, @CurrentUser() userInfo) {
    return await this.courseService.createCourse(course, userInfo);
  }

  @Delete('delete/:id')
  async deleteCourse(@Param() course, @CurrentUser() userInfo) {
    return await this.courseService.deleteCourse(course, userInfo);
  }

  @Put('update/:id')
  async updateCourse(
    @Param() course,
    @Body() updatedCourse,
    @CurrentUser() userInfo,
  ) {
    return await this.courseService.updateCourse(
      course,
      updatedCourse,
      userInfo,
    );
  }
}
