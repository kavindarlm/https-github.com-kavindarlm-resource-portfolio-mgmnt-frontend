import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProjectModule } from './project/project.module'; /// import project module
import { TaskModule } from './task/task.module'; /// import task module
import { UserModule } from './user/user.module';
import { FunctionsModule } from './functions/functions.module';
import { UsersFunctionModule } from './users_function/users_function.module';
import { ResourceModule } from './resource/resource.module';
import { JobRoleModule } from './job_role/job_role.module';
import { OrgUnitModule } from './org_unit/org_unit.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, FunctionsModule, UsersFunctionModule, ProjectModule, TaskModule, ResourceModule, JobRoleModule, OrgUnitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
