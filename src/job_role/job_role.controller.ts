import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { JobRoleService } from './job_role.service';
import { CreateJobRoleDto } from './dto/create-job_role.dto';
import { UpdateJobRoleDto } from './dto/update-job_role.dto';
import { JwtAuthGuard } from 'src/Auth/jwtauthGuard';

@Controller('job-role')
@UseGuards(JwtAuthGuard)
export class JobRoleController {

  constructor(private jobRoleService: JobRoleService) {}

  @Get()
  async getJobRoles() {
    return this.jobRoleService.findJobRole();
  }

  @Get(':roleId')
  async getRoleNameById(@Param('roleId', ParseIntPipe) roleId: number) {
    return this.jobRoleService.getRoleNameById(roleId);
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


}
