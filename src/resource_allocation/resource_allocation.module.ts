import { Module } from '@nestjs/common';
import { ResourceAllocationService } from './resource_allocation.service';
import { ResourceAllocationController } from './resource_allocation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceAllocation } from './entities/resource_allocation.entity';
import { Task } from 'src/task/entities/task.entity';
import { Resource } from 'src/resource/entities/resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceAllocation, Task, Resource])],
  controllers: [ResourceAllocationController],
  providers: [ResourceAllocationService]
})
export class ResourceAllocationModule {}
