import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ResourceModule } from './resource/resource.module';
import { JobRoleModule } from './job_role/job_role.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ResourceModule, JobRoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
