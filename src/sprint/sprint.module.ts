import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SprintService } from './sprint.service';
import { SprintController } from './sprint.controller';
import { Sprint } from './entities/sprint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sprint])],
  controllers: [SprintController],
  providers: [SprintService]
})
export class SprintModule {}
