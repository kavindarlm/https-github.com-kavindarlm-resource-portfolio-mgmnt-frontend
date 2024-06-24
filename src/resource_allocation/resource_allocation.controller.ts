import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { ResourceAllocationService } from './resource_allocation.service';
import { CreateResourceAllocationDto } from './dto/create-resource_allocation.dto';
import { UpdateResourceAllocationDto } from './dto/update-resource_allocation.dto';
import { ResourceAllocation } from './entities/resource_allocation.entity';
import { JwtAuthGuard } from 'src/Auth/jwtauthGuard';

@Controller('resource-allocation')
@UseGuards(JwtAuthGuard)
export class ResourceAllocationController {
  constructor(private readonly resourceAllocationService: ResourceAllocationService) { }

  @Get(':resourceId')
  async getTasksByResourceId(
    @Param('resourceId') resourceId: string
  ): Promise<{ resourceAllocation: ResourceAllocation }[]> {
    // Call the service function and return the result
    return this.resourceAllocationService.getTasksByResourceId(resourceId);
  }

  @Post()
  async createResourceAllocation(@Body() createResourceAllocationDto: CreateResourceAllocationDto): Promise<ResourceAllocation> {
    return this.resourceAllocationService.createResourceAllocation(createResourceAllocationDto);
  }

  // Endpoint to get resource allocation data by sprint_id
  @Get('/sprint/:sprintId')
  async getResourceAllocationBySprintId(
    @Param('sprintId') sprintId: number
  ): Promise<ResourceAllocation[]> {
    // Call the service method to get resource allocation data by sprint_id
    return this.resourceAllocationService.getResourceAllocationBySprintId(sprintId);
  }

  @Delete(':id')
  async deleteResourceAllocation(@Param('id') id: number): Promise<void> {
    try {
      // Call the service method to delete resource allocation by ID
      await this.resourceAllocationService.deleteResourceAllocationById(id);
      console.log(`Resource allocation with ID ${id} deleted successfully.`);
    } catch (error) {
      // Log the error and throw an HTTP exception with appropriate status
      console.error(`Error deleting resource allocation with ID ${id}:`, error);
    }
  }

  // Endpoint to delete all resource allocations by sprint ID
  @Delete('/sprint/:sprintId')
  async deleteResourceAllocationsBySprintId(@Param('sprintId') sprintId: number): Promise<void> {
    try {
      // Call the service method to delete all resource allocations by sprint ID
      await this.resourceAllocationService.deleteResourceAllocationsBySprintId(sprintId);
      console.log(`Resource allocations for sprint ID ${sprintId} deleted successfully.`);
    } catch (error) {
      // Log the error and throw an HTTP exception with appropriate status
      console.error(`Error deleting resource allocations for sprint ID ${sprintId}:`, error);
      throw new HttpException('Unable to delete resource allocations by sprint ID', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async updateResourceAllocation(
    @Param('id') id: number,
    @Body() updateResourceAllocationDto: UpdateResourceAllocationDto,
  ): Promise<ResourceAllocation> {
    try {
      // Call the service method to update the resource allocation
      const updatedResourceAllocation = await this.resourceAllocationService.updateResourceAllocation(id, updateResourceAllocationDto);
      return updatedResourceAllocation;
    } catch (error) {
      // Handle different types of errors and return appropriate HTTP status codes and error messages
      if (error instanceof NotFoundException) {
        throw error;  // Already handles returning a 404 status code
      }
      // Add handling for other error types as needed
      throw new HttpException('Error updating resource allocation', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id/task/:taskId')
  async updateResourceAllocationTaskId(
    @Param('id') id: number,
    @Param('taskId') taskId: number
  ): Promise<ResourceAllocation> {
    return this.resourceAllocationService.updateTaskId(id, taskId);
  }

}
