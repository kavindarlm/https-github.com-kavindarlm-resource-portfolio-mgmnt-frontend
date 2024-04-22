import { Injectable } from '@nestjs/common';
import { CreateJobRoleDto } from './dto/create-job_role.dto';
import { UpdateJobRoleDto } from './dto/update-job_role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobRole } from './entities/job_role.entity';
import { Repository } from 'typeorm';
import { CreateJobRoleParams, UpdateJobRoleParams } from 'src/utils/types';

@Injectable()
export class JobRoleService {

  //Injecting the repository
  constructor(@InjectRepository(JobRole) private jobRoleRepository: Repository<JobRole>,) {

  }

  findJobRole() {
    return this.jobRoleRepository.find();
  }

  createJobRole(jobRoleDetails: CreateJobRoleParams) {
    const newJobRole = this.jobRoleRepository.create({...jobRoleDetails});
    return this.jobRoleRepository.save(newJobRole);
  }

  updateJobRole(roleId: number, updateJobRoleDetails: UpdateJobRoleParams) {
    this.jobRoleRepository.update({roleId}, {...updateJobRoleDetails});
  }

  deleteJobRole(roleId: number){
    return this.jobRoleRepository.delete({ roleId });
  }

  async getRoleNameById(roleId: number): Promise<string | undefined> {
    const jobRole = await this.jobRoleRepository.findOne({ where: { roleId } });
    return jobRole?jobRole.roleName: '';
  }

}
