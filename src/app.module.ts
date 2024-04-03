import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { FunctionsModule } from './functions/functions.module';
import { UsersFunctionModule } from './users_function/users_function.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, ProjectModule, TaskModule, FunctionsModule, UsersFunctionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
