import { Module } from '@nestjs/common';
import { JobRoleService } from './job_role.service';
import { JobRoleController } from './job_role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobRole } from './entities/job_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobRole])],
  controllers: [JobRoleController],
  providers: [JobRoleService]
})
export class JobRoleModule {}
