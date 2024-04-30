import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResourceAllocationService } from './resource_allocation.service';
import { CreateResourceAllocationDto } from './dto/create-resource_allocation.dto';
import { UpdateResourceAllocationDto } from './dto/update-resource_allocation.dto';

@Controller('resource-allocation')
export class ResourceAllocationController {
  constructor(private readonly resourceAllocationService: ResourceAllocationService) {}

  @Post()
  create(@Body() createResourceAllocationDto: CreateResourceAllocationDto) {
    return this.resourceAllocationService.create(createResourceAllocationDto);
  }

  @Get()
  findAll() {
    return this.resourceAllocationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourceAllocationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResourceAllocationDto: UpdateResourceAllocationDto) {
    return this.resourceAllocationService.update(+id, updateResourceAllocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourceAllocationService.remove(+id);
  }
}
