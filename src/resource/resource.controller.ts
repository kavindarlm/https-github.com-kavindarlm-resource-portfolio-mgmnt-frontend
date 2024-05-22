import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';

@Controller('resource')
export class ResourceController {
  constructor(private resourceService: ResourceService) { }

    //api for team management
  
    @Get('no-team')
    async getResourcesByTeamIdNull() {
      return this.resourceService.getResourcesByTeamIdNull();
    }
  
  
    @Get('team/null/:teamId')
    async getResourcesByTeamIdAndNull(@Param('teamId') teamId: number) {
      return this.resourceService.getResourcesByTeamIdAndNull(teamId);
    }
  
    @Get('team/:teamId')
    async getResourcesByTeamId(@Param('teamId') teamId: number) {
      return this.resourceService.getResourcesByTeamId(teamId);
    }
  
  @Get()
  getResources() {
    return this.resourceService.findResources();
  }

  @Get(':resourceId')
  async findOneResource(@Param('resourceId') resourceId: string) {
    return this.resourceService.findOneResource(resourceId);
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
