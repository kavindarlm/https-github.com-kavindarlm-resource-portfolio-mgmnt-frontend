import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { ResourceHoliday } from 'src/resource_holiday/entities/resource_holiday.entity';
import { Holiday } from 'src/holiday/entities/holiday.entity';
import { JobRole } from 'src/job_role/entities/job_role.entity';
import { OrgUnit } from 'src/org_unit/entities/org_unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resource,ResourceHoliday,Holiday,JobRole,OrgUnit])],
  controllers: [ResourceController], // Only controllers go here
  providers: [ResourceService] // Services go here
})
export class ResourceModule {}