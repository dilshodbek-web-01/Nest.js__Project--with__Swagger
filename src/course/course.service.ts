import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseRepository } from './course.repo';

@Injectable()
export class CourseService {
  constructor(private courseRepository: CourseRepository) {}

  async getCourses({ id }) {
    return this.courseRepository.getCourses(id);
  }

  async getCourse(course, { id }) {
    let result = await this.courseRepository.getOne(course, id);
    if (result.length == 0)
      return new NotFoundException(`Course ${course.id} not found!`);

    return result;
  }

  async createCourse(course, userInfo) {
    const { id } = userInfo;
    let newCourse = await this.courseRepository.createCourse(course, id);

    return {
      message: 'Create course',
    };
  }

  async deleteCourse(course, { id }) {
    let result = await this.courseRepository.deleteCourse(course, id);

    if (result.length === 0) {
      return new NotFoundException(`Course ${course.id} not found!`);
    }
    return {
      message: 'Course deleted!',
    };
  }

  async updateCourse(course, updatedCourse, { id }) {
    let result = await this.courseRepository.updateCourse(
      course,
      updatedCourse,
      id,
    );

    if (result.length === 0) {
      return new NotFoundException(`Course ${course.id} not found!`);
    }
    return {
      message: 'Course updated!',
    };
  }
}
