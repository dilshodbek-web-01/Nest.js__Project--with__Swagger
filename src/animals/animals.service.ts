import { Injectable, NotFoundException } from '@nestjs/common';
import { AnimalsRepository } from './animals.repo';

@Injectable()
export class AnimalsService {
  constructor(private animalsRepository: AnimalsRepository) {}

  async getAnimals({ id }) {
    return this.animalsRepository.getAnimals(id);
  }

  async getAnimal(animal, { id }) {
    let result = await this.animalsRepository.getOne(animal, id);
    if (result.length == 0)
      return new NotFoundException(`Animal ${animal.id} not found!`);

    return result;
  }

  async createAnimal(animalInfo, { id }) {
    let newAnimal = await this.animalsRepository.createAnimal(animalInfo, id);

    return {
      message: 'Create animal',
    };
  }

  async deleteAnimal(animal, { id }) {
    let result = await this.animalsRepository.deleteAnimal(animal, id);

    if (result.length === 0) {
      return new NotFoundException(`Animal ${animal.id} not found!`);
    }
    return {
      message: 'Animal deleted!',
    };
  }

  async updateAnimal(animal, updatedAnimal, { id }) {
    let result = await this.animalsRepository.updateAnimal(
      animal,
      updatedAnimal,
      id,
    );

    if (result.length === 0) {
      return new NotFoundException(`Animal ${animal.id} not found!`);
    }
    return {
      message: 'Animal updated!',
    };
  }
}
