import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { CarsRepository } from './cars.repo';
import { KnexConfigModule } from 'src/KnexConfig/Knex.module';

@Module({
    imports: [KnexConfigModule],
    controllers: [CarsController],
    providers: [CarsService, CarsRepository],
})
export class CarsModule {}
