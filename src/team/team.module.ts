import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Resource } from 'src/resource/entities/resource.entity';
import { ResourceService } from 'src/resource/resource.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team,Resource])],
  controllers: [TeamController],
  providers: [TeamService,ResourceService],
  exports: [TeamService]
})
export class TeamModule {}
