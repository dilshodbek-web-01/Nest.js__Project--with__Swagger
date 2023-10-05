import { Inject } from '@nestjs/common';
import { KnexConfig } from 'src/KnexConfig/knexConfig';

export class FruitsRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getFruits(id) {
    const knex = this.knexConfig.instance;

    return knex.select('*').from('fruits').where({ created_by_user_id: id });
  }

  createFruit(fruitInfo, id) {
    const knex = this.knexConfig.instance;

    const { title, price, country, description } = fruitInfo;
    return knex('fruits').insert({
      title,
      price,
      country,
      description,
      created_by_user_id: id,
    });
  }

  getOne(fruit, id) {
    const knex = this.knexConfig.instance;

    return knex
      .select('*')
      .from('fruits')
      .where({ id: fruit.id, created_by_user_id: id });
  }

  deleteFruit(fruit, id) {
    const knex = this.knexConfig.instance;

    return (
      knex('fruits')
        .returning('*')
        // .where({ id })
        .where({ id: fruit.id, created_by_user_id: id })
        .del()
    );
  }

  updateFruit(fruit, fruitInfo, id) {
    const knex = this.knexConfig.instance;

    return knex('fruits')
      .returning('*')
      .where({ id: fruit.id, created_by_user_id: id })
      .update(fruitInfo);
  }
}
