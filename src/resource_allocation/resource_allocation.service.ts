import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceAllocation } from './entities/resource_allocation.entity';
import { Task } from 'src/task/entities/task.entity';
import { CreateResourceAllocationDto } from './dto/create-resource_allocation.dto';
import { UpdateResourceAllocationDto } from './dto/update-resource_allocation.dto';
import { Sprint } from 'src/sprint/entities/sprint.entity';
import { Resource } from 'src/resource/entities/resource.entity';
import { NotFoundException } from '@nestjs/common';

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


  async getTasksByResourceId(resourceId: string): Promise<{ resourceAllocation: ResourceAllocation }[]> {
    // Fetching resource allocations with related task data based on the provided resourceId
    const resourceAllocations = await this.resourceAllocationRepository.find({
      where: { resource: { resourceId: resourceId } },
      relations: ['task'], // Ensure task is included in the fetched data
    });

    // Return an array of objects containing both task and resource allocation details
    return resourceAllocations.map(resourceAllocation => ({
      // task: resourceAllocation.task, // task details
      resourceAllocation: resourceAllocation, // resource allocation details
    }));
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

  async updateResourceAllocation(id: number, updateResourceAllocationDto: UpdateResourceAllocationDto): Promise<ResourceAllocation> {
    try {
      // Find the existing resource allocation by its ID
      const resourceAllocation = await this.resourceAllocationRepository.findOne({ where: { id } });

      // If the resource allocation is not found, throw an error
      if (!resourceAllocation) {
        throw new NotFoundException(`Resource allocation with ID ${id} not found`);
      }

      // Update the percentage field if it is provided in the DTO
      if (updateResourceAllocationDto.percentage !== undefined) {
        resourceAllocation.percentage = updateResourceAllocationDto.percentage;
      }

      // Save the updated resource allocation to the database
      await this.resourceAllocationRepository.save(resourceAllocation);

      // Return the updated resource allocation
      return resourceAllocation;
    } catch (error) {
      console.error(`Error updating resource allocation with ID ${id}:`, error);
      // Handle any other error types as needed
      throw new HttpException('Failed to update resource allocation', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateTaskId(id: number, taskId: number): Promise<ResourceAllocation> {
    // Find the existing resource allocation by its ID
    const resourceAllocation = await this.resourceAllocationRepository.findOne({
      where: { id },
      relations: ['task'],
    });

    // If the resource allocation is not found, throw an error
    if (!resourceAllocation) {
      throw new NotFoundException(`Resource allocation with ID ${id} not found`);
    }

    // Find the new task based on the provided task ID
    const newTask = await this.taskRepository.findOne({ where: { taskid: taskId } });
    if (!newTask) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    // Update the task relationship
    resourceAllocation.task = newTask;

    // Save the updated resource allocation to the database
    await this.resourceAllocationRepository.save(resourceAllocation);

    // Return the updated resource allocation
    return resourceAllocation;
  }



}


