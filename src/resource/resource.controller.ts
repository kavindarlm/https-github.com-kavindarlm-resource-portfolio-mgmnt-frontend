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

  @Get('/ForSprint')
  async findMany() {
    const resources = await this.resourceService.findMany();
    return resources.map(resource => ({
      resource_id: resource.resourceId,
      resource_name: resource.resourceName,
      team_name: resource.teams? resource.teams.team_Name : null,
      role_name: resource.job_role? resource.job_role.roleName : null,
      org_unit_name: resource.org_unit? resource.org_unit.unitName : null,
    }));
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
