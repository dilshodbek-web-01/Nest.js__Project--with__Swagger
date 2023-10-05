import { Inject } from '@nestjs/common';
import { KnexConfig } from 'src/KnexConfig/knexConfig';

export class CarsRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getCars(id) {
    const knex = this.knexConfig.instance;

    return knex.select('*').from('cars').where({ created_by_user_id: id });
  }

  createCar(carInfo, id) {
    const knex = this.knexConfig.instance;

    const { title, price, color, description } = carInfo;
    return knex('cars').insert({
      title,
      price,
      color,
      description,
      created_by_user_id: id,
    });
  }

  getOne(car, id) {
    const knex = this.knexConfig.instance;

    return knex
      .select('*')
      .from('cars')
      .where({ id: car.id, created_by_user_id: id });
  }

  deleteCar(car, id) {
    const knex = this.knexConfig.instance;

    return (
      knex('cars')
        .returning('*')
        // .where({ id })
        .where({ id: car.id, created_by_user_id: id })
        .del()
    );
  }

  updateCar(car, carInfo, id) {
    const knex = this.knexConfig.instance;

    return knex('cars')
      .returning('*')
      .where({ id: car.id, created_by_user_id: id })
      .update(carInfo);
  }
}
