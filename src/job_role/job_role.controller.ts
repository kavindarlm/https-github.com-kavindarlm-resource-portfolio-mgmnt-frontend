import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { JobRoleService } from './job_role.service';
import { CreateJobRoleDto } from './dto/create-job_role.dto';
import { UpdateJobRoleDto } from './dto/update-job_role.dto';

@Controller('job-role')
export class JobRoleController {

  constructor(private jobRoleService: JobRoleService) {}

  @Get()
  async getJobRoles() {
    return this.jobRoleService.findJobRole();
  }

  @Post()
  createJobRole(@Body() createJobRoleDto: CreateJobRoleDto) {
    return this.jobRoleService.createJobRole(createJobRoleDto);
  }

  @Put(':roleId')
  async updateJobRoleById(@Param('roleId', ParseIntPipe) roleId:number, @Body() updateJobRoleDto: UpdateJobRoleDto) {
    await this.jobRoleService.updateJobRole(roleId, updateJobRoleDto);
  }

  @Delete(':roleId')
  async deleteJobRoleById(@Param('roleId', ParseIntPipe) roleId:number) {
    await this.jobRoleService.deleteJobRole(roleId);
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.jobRoleService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateJobRoleDto: UpdateJobRoleDto) {
  //   return this.jobRoleService.update(+id, updateJobRoleDto);
  // }

}
