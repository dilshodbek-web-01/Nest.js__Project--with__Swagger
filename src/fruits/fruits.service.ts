import { Injectable, NotFoundException } from '@nestjs/common';
import { FruitsRepository } from './fruits.repo';


@Injectable()
export class FruitsService {
  constructor(private fruitsRepository: FruitsRepository) {}

  async getFruits({ id }) {
    return this.fruitsRepository.getFruits(id);
  }

  async getFruit(fruit, { id }) {
    let result = await this.fruitsRepository.getOne(fruit, id);
    if (result.length == 0)
      return new NotFoundException(`Fruit ${fruit.id} not found!`);

    return result;
  }

  async createFruit(fruitInfo, { id }) {
    let newFruit = await this.fruitsRepository.createFruit(fruitInfo, id);

    return {
      message: 'Created fruit',
    };
  }

  async deleteFruit(fruit, { id }) {
    let result = await this.fruitsRepository.deleteFruit(fruit, id);

    if (result.length === 0) {
      return new NotFoundException(`Fruit ${fruit.id} not found!`);
    }
    return {
      message: 'Fruit deleted!',
    };
  }

  async updateFruit(fruit, fruitInfo, { id }) {
    let result = await this.fruitsRepository.updateFruit(fruit, fruitInfo, id);

    if (result.length === 0) {
      return new NotFoundException(`Fruit ${fruit.id} not found!`);
    }
    return {
      message: 'Fruit updated!',
    };
  }
}
