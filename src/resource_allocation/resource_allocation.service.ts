import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceAllocation } from './entities/resource_allocation.entity';
import { Task } from 'src/task/entities/task.entity';
import { CreateResourceAllocationDto } from './dto/create-resource_allocation.dto';
import { UpdateResourceAllocationDto } from './dto/update-resource_allocation.dto';
import { Sprint } from 'src/sprint/entities/sprint.entity';
import { Resource } from 'src/resource/entities/resource.entity';

@Injectable()
export class ResourceAllocationService {

  constructor(
    @InjectRepository(ResourceAllocation)
    private resourceAllocationRepository: Repository<ResourceAllocation>,
    @InjectRepository(Sprint)
    private sprintRepository: Repository<Sprint>,
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) { }

  async createResourceAllocation(createResourceAllocationDto: CreateResourceAllocationDto): Promise<ResourceAllocation> {
    const { sprint_id, resource_id, task_id, percentage } = createResourceAllocationDto;

    // Create a new ResourceAllocation instance
    const resourceAllocation = new ResourceAllocation();
    resourceAllocation.percentage = percentage;

    // Retrieve the related entities using their repositories
    const sprint = await this.sprintRepository.findOne({
      where: { sprint_id: sprint_id },
    });

    const resource = await this.resourceRepository.findOne({
      where: { resourceId: resource_id },
    });

    const task = await this.taskRepository.findOne({
      where: { taskid: task_id },
    });


    // Assign the retrieved entities to the resourceAllocation instance
    resourceAllocation.sprint = sprint;
    resourceAllocation.resource = resource;
    resourceAllocation.task = task;

    // Save the resource allocation to the database
    return await this.resourceAllocationRepository.save(resourceAllocation);
  }


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

  async getResourceAllocationBySprintId(sprintId: number): Promise<ResourceAllocation[]> {
    // Query the repository to find all resource allocation records with the given sprint_id
    const resourceAllocations = await this.resourceAllocationRepository.find({
      where: { sprint: { sprint_id: sprintId } },
      relations: ['sprint', 'resource', 'task'],
    });
  
    // Return the list of resource allocation records
    return resourceAllocations;
  }

  // Method to delete a resource allocation row by its ID
  async deleteResourceAllocationById(id: number): Promise<void> {
    try {
      // Attempt to delete the resource allocation row by its ID
      await this.resourceAllocationRepository.delete(id);
      console.log(`Resource allocation with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting resource allocation with ID ${id}:`, error);
      throw new Error('Unable to delete resource allocation row.');
    }
  }
  


}


