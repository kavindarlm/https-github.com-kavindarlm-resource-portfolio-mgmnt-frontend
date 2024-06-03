import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Project } from 'src/project/entities/project.entity';
import { ResourceAllocation } from 'src/resource_allocation/entities/resource_allocation.entity';
import { Resource } from 'src/resource/entities/resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task,Project,ResourceAllocation,Resource])],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
