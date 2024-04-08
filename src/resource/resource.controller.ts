import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Controller('resource')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Get()
    getResources() {
        return this.resourceService.findResources();
    }

  @Post()
    createResource(@Body() createResourceDto: CreateResourceDto) {
        return this.resourceService.createResource(createResourceDto);
    }

    @Put(':resourceId')  
    async updateResourceById(@Param('resourceId') resourceId: string, @Body() updateResourceDto: UpdateResourceDto,) {
       await this.resourceService.updateResource(resourceId, updateResourceDto);
    }

    @Delete(':resourceId')
    async deleteResourceById(@Param('resourceId') resourceId: string) {
        await this.resourceService.deleteResource(resourceId);
     }
}
