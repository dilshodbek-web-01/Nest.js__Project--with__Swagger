import { Module } from '@nestjs/common';
import { KnexConfigModule } from 'src/KnexConfig/Knex.module';
import { AnimalsController } from './animals.controller';
import { AnimalsRepository } from './animals.repo';
import { AnimalsService } from './animals.service';

@Module({
  imports: [KnexConfigModule],
  controllers: [AnimalsController],
  providers: [AnimalsService, AnimalsRepository],
})
export class AnimalsModule {}
