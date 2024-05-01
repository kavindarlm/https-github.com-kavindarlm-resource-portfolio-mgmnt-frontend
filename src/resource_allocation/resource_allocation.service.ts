import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceAllocation } from './entities/resource_allocation.entity';
import { Task } from 'src/task/entities/task.entity';
import { CreateResourceAllocationDto } from './dto/create-resource_allocation.dto';
import { UpdateResourceAllocationDto } from './dto/update-resource_allocation.dto';

@Injectable()
export class ResourceAllocationService {

  constructor(
    @InjectRepository(ResourceAllocation)
    private resourceAllocationRepository: Repository<ResourceAllocation>,
  ) { }

  async getTasksByResourceId(resourceId: string): Promise<Task[]> {
    const resourceAllocations = await this.resourceAllocationRepository.find({
      where: { resource: { resourceId: resourceId } },
      relations: ['task'],
    });

    if (!resourceAllocations || resourceAllocations.length === 0) {
      return [];
    }

    return resourceAllocations.map(resourceAllocation => resourceAllocation.task);
  }

}
