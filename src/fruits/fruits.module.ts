import { Module } from '@nestjs/common';
import { KnexConfigModule } from 'src/KnexConfig/Knex.module';
import { FruitsController } from './fruits.controller';
import { FruitsRepository } from './fruits.repo';
import { FruitsService } from './fruits.service';

@Module({
    imports: [KnexConfigModule],
    controllers: [FruitsController],
    providers: [FruitsService, FruitsRepository ],
})
export class FruitsModule {}
