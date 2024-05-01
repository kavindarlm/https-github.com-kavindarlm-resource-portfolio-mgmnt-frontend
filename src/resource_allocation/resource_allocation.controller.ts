import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResourceAllocationService } from './resource_allocation.service';
import { CreateResourceAllocationDto } from './dto/create-resource_allocation.dto';
import { UpdateResourceAllocationDto } from './dto/update-resource_allocation.dto';
import { Task } from 'src/task/entities/task.entity';

@Controller('resource-allocation')

export class ResourceAllocationController {
  constructor(private readonly resourceAllocationService: ResourceAllocationService) {}

  @Get(':resourceId')
  async getTasksByResourceId(@Param('resourceId') resourceId: string): Promise<Task[]> {
    return this.resourceAllocationService.getTasksByResourceId(resourceId);
  }

}
