import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { JobRoleService } from './job_role.service';
import { CreateJobRoleDto } from './dto/create-job_role.dto';
import { UpdateJobRoleDto } from './dto/update-job_role.dto';
import { JwtAuthGuard } from 'src/Auth/jwtauthGuard';
import { GetUser } from 'src/Auth/get-user.decorator';

@Controller('job-role')
@UseGuards(JwtAuthGuard)
export class JobRoleController {

  constructor(private jobRoleService: JobRoleService) {}

  //get job roles
  @Get()
  async getJobRoles() {
    return this.jobRoleService.findJobRole();
  }

  //get job role by id
  @Get(':roleId')
  async getRoleNameById(@Param('roleId', ParseIntPipe) roleId: number) {
    return this.jobRoleService.getRoleNameById(roleId);
  }

  //create a job role
  @Post()
  createJobRole(@Body() createJobRoleDto: CreateJobRoleDto, @GetUser() user: any) {
    createJobRoleDto.createdBy = user.id;
    return this.jobRoleService.createJobRole(createJobRoleDto);
  }

  //update a job role
  @Put(':roleId')
  async updateJobRoleById(@Param('roleId', ParseIntPipe) roleId:number, @Body() updateJobRoleDto: UpdateJobRoleDto, @GetUser() user: any) {
    updateJobRoleDto.updatedBy = user.id;
    await this.jobRoleService.updateJobRole(roleId, updateJobRoleDto);
  }

  //delete a job role
  @Delete(':roleId')
  async deleteJobRoleById(@Param('roleId', ParseIntPipe) roleId:number) {
    await this.jobRoleService.deleteJobRole(roleId);
  }
}
