import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { UsersModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';
import { KnexConfigModule } from './KnexConfig/Knex.module';
import { AuthModule } from './auth/auth.module';
import { FruitsModule } from './fruits/fruits.module';
import { AnimalsModule } from './animals/animals.module';

@Module({
  imports: [
    CourseModule,
    UsersModule,
    CarsModule,
    FruitsModule,
    AnimalsModule,
    KnexConfigModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
