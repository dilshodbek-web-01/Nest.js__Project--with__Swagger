import { Inject } from '@nestjs/common';
import { KnexConfig } from '../KnexConfig/knexConfig';

export class CourseRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getCourses(id) {
    const knex = this.knexConfig.instance;

    return knex.select('*').from('courses').where({ created_by_user_id: id });
  }

  createCourse(course, id) {
    const knex = this.knexConfig.instance;

    const { title, price, description, teacher_id } = course;
    return knex('courses').insert({
      title,
      price,
      description,
      teacher_id,
      created_by_user_id: id,
    });
  }

  getOne(course, id) {
    const knex = this.knexConfig.instance;

    return knex
      .select('*')
      .from('courses')
      .where({ id: course.id, created_by_user_id: id });
  }

  deleteCourse(course, id) {
    const knex = this.knexConfig.instance;

    return (
      knex('courses')
        .returning('*')
        // .where({ id })
        .where({ id: course.id, created_by_user_id: id })
        .del()
    );
  }

  updateCourse(course, updatedCourse, id) {
    const knex = this.knexConfig.instance;

    return knex('courses')
      .returning('*')
      .where({ id: course.id, created_by_user_id: id })
      .update(updatedCourse);
  }
}
