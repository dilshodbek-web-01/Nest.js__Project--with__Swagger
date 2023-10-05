import { Inject } from '@nestjs/common';
import { KnexConfig } from '../KnexConfig/knexConfig';

export class AnimalsRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getAnimals(id) {
    const knex = this.knexConfig.instance;

    return knex.select('*').from('animals').where({ created_by_user_id: id });
  }

  createAnimal(animalInfo, id) {
    const knex = this.knexConfig.instance;

    const { title, color, type } = animalInfo;
    return knex('animals').insert({
      title,
      color,
      type,
      created_by_user_id: id,
    });
  }

  getOne(animal, id) {
    const knex = this.knexConfig.instance;

    return knex
      .select('*')
      .from('animals')
      .where({ id: animal.id, created_by_user_id: id });
  }

  deleteAnimal(animal, id) {
    const knex = this.knexConfig.instance;

    return (
      knex('animals')
        .returning('*')
        // .where({ id })
        .where({ id: animal.id, created_by_user_id: id })
        .del()
    );
  }

  updateAnimal(animal, updatedAnimal, id) {
    const knex = this.knexConfig.instance;

    return knex('animals')
      .returning('*')
      .where({ id: animal.id, created_by_user_id: id })
      .update(updatedAnimal);
  }
}
