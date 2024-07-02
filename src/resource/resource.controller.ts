import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourceWithInitials } from './resource.service';
import { JwtAuthGuard } from 'src/Auth/jwtauthGuard';
import { GetUser } from 'src/Auth/get-user.decorator';

@Controller('resource')
@UseGuards(JwtAuthGuard)
export class ResourceController {
  constructor(private resourceService: ResourceService) { }

  //api for team management

  @Get('no-team')
  async getResourcesByTeamIdNull(@Query('jobRole') jobRole?: string, @Query('orgUnit') orgUnit?: string) {
    return this.resourceService.getResourcesByTeamIdNull(jobRole, orgUnit);
  }

  @Get('jobRoles')
  getJobRoles(): Promise<string[]> {
    return this.resourceService.getJobRoles();
  }

  @Get('orgUnits')
  getOrgUnits(): Promise<string[]> {
    return this.resourceService.getOrgUnits();
  }

  @Get('team/null/:teamId')
  async getResourcesByTeamIdAndNull(@Param('teamId') teamId: number) {
    return this.resourceService.getResourcesByTeamIdAndNull(teamId);
  }


  @Get('team/:teamId')
  async getResourcesByTeamId(
    @Param('teamId') teamId: number,
    @Query('jobRole') jobRole?: string,
    @Query('orgUnit') orgUnit?: string
  ) {
    return this.resourceService.getResourcesByTeamId(teamId, jobRole, orgUnit);
  }

  // @Get('holiday/:resourceId')
  // getResourceById(@Param('resourceId') resourceId: string): Promise<Resource> {
  //   return this.resourceService.getResourceById(resourceId);
  // }
  @Get('holiday/:resourceId')
getResourceById(@Param('resourceId') resourceId: string): Promise<ResourceWithInitials> {
  return this.resourceService.getResourceById(resourceId);
}

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
      team_name: resource.teams ? resource.teams.team_Name : null,
      role_name: resource.job_role ? resource.job_role.roleName : null,
      org_unit_name: resource.org_unit ? resource.org_unit.unitName : null,
    }));
  }

  //get a resource by id
  @Get(':resourceId')
  async findOneResource(@Param('resourceId') resourceId: string) {
    return this.resourceService.findOneResource(resourceId);
  }

  //create a resource
  @Post()
  createResource(@Body() createResourceDto: CreateResourceDto, @GetUser() user: any) {
    createResourceDto.createdBy = user.id;
    return this.resourceService.createResource(createResourceDto);
  }

  //update resources
  @Put(':resourceId')
  async updateResourceById(@Param('resourceId') resourceId: string, @Body() updateResourceDto: UpdateResourceDto, @GetUser() user: any) {
    updateResourceDto.updatedBy = user.id;
    await this.resourceService.updateResource(resourceId, updateResourceDto);
  }

  //delete resources
  @Delete(':resourceId')
  async deleteResourceById(@Param('resourceId') resourceId: string) {
    await this.resourceService.deleteResource(resourceId);
  }

  //Count resources
  @Get('countresources/resourcecount')
  async countResources() {
    return await this.resourceService.countResources();
  }

}
