import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobRole } from './entities/job_role.entity';
import { Repository } from 'typeorm';
// import { CreateJobRoleParams, UpdateJobRoleParams } from 'src/utils/types';
import { CreateJobRoleParams } from './dto/create-job_role.dto';
import { UpdateJobRoleParams } from './dto/update-job_role.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class JobRoleService {

  //Injecting the repository
  constructor(@InjectRepository(JobRole) private jobRoleRepository: Repository<JobRole>,) {

  }

  findJobRole() {
    return this.jobRoleRepository.find();
  }

  createJobRole(jobRoleDetails: CreateJobRoleParams) {
    const newJobRole = this.jobRoleRepository.create({...jobRoleDetails, createdBy: { user_id: jobRoleDetails.createdBy} as User});
    return this.jobRoleRepository.save(newJobRole);
  }

  updateJobRole(roleId: number, updateJobRoleDetails: UpdateJobRoleParams) {
    this.jobRoleRepository.update({roleId}, {...updateJobRoleDetails, updatedBy: { user_id: updateJobRoleDetails.updatedBy} as User});
  }

  deleteJobRole(roleId: number){
    return this.jobRoleRepository.delete({ roleId });
  }

  async getRoleNameById(roleId: number): Promise<string | undefined> {
    const jobRole = await this.jobRoleRepository.findOne({ where: { roleId } });
    return jobRole?jobRole.roleName: '';
  }

}
