import { Module } from '@nestjs/common';
import { ResourceAllocationService } from './resource_allocation.service';
import { ResourceAllocationController } from './resource_allocation.controller';

@Module({
  controllers: [ResourceAllocationController],
  providers: [ResourceAllocationService]
})
export class ResourceAllocationModule {}
