import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Resource } from 'src/resource/entities/resource.entity';
import { ResourceService } from 'src/resource/resource.service';
import { OrgUnit } from 'src/org_unit/entities/org_unit.entity';
import { JobRole } from 'src/job_role/entities/job_role.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team,Resource,OrgUnit,JobRole, User])],
  controllers: [TeamController],
  providers: [TeamService,ResourceService],
  exports: [TeamService]
})
export class TeamModule {}
