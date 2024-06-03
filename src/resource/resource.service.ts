import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateResourceParams, UpdateResourceParams } from 'src/utils/types';
import { CreateResourceParams } from './dto/create-resource.dto';
import { UpdateResourceParams } from './dto/update-resource.dto';
import { JobRole } from 'src/job_role/entities/job_role.entity';
import { OrgUnit } from 'src/org_unit/entities/org_unit.entity';

@Injectable()
export class ResourceService {

  //to interact with database, inject typeorm repository in to our class
  constructor(@InjectRepository(Resource) private resourceRepository: Repository<Resource>,
  @InjectRepository(JobRole)
  private jobRoleRepository: Repository<JobRole>,
  @InjectRepository(OrgUnit)
  private orgUnitRepository: Repository<OrgUnit>,) { }


  async findResources(): Promise<Resource[]> {
    // Use the repository to find resources and include the necessary relations
    return this.resourceRepository.find({
      relations: ['teams', 'job_role', 'org_unit'], // Include relations for team, job role, and org unit
    });
  }

  async findMany(): Promise<Resource[]> {
    return this.resourceRepository.find({ relations: ['job_role', 'org_unit', 'teams'] });
  }

  async findOneResource(resourceId: string): Promise<Resource> {
    const resource = await this.resourceRepository.findOne({ where: { resourceId }, relations: ['job_role', 'org_unit', 'teams'] });
    if (!resource) {
      throw new NotFoundException(`Resource with ID ${resourceId} not found.`);
    }
    return resource;
  }

  createResource(resourceDetails: CreateResourceParams) {
    const newResource = this.resourceRepository.create({ ...resourceDetails, createdAt: new Date() });
    return this.resourceRepository.save(newResource);
  }

  updateResource(resourceId: string, updateResourceDetails: UpdateResourceParams) {
    return this.resourceRepository.update({ resourceId }, { ...updateResourceDetails });
  }

  deleteResource(resourceId: string) {
    return this.resourceRepository.delete({ resourceId });
  }

  //methods for team management

  //display resources which do not have teamid only and filer by jobrole and unit
  async getResourcesByTeamIdNull(jobRole?: string, orgUnit?: string): Promise<{resourceId: string, roleName: string, unitName: string }[]> {
    let query = this.resourceRepository
      .createQueryBuilder('resource')
      .leftJoinAndSelect('resource.job_role', 'job_role')
      .leftJoinAndSelect('resource.org_unit', 'org_unit')
      .where('resource.teamId IS NULL');
  
    if (jobRole) {
      query = query.andWhere('job_role.roleName = :jobRole', { jobRole });
    }
  
    if (orgUnit) {
      query = query.andWhere('org_unit.unitName = :orgUnit', { orgUnit });
    }
  
    const resources = await query.getMany();
  
    return resources.map(resource => ({
      resourceId: resource.resourceId,
      roleName: resource.job_role.roleName,
      unitName: resource.org_unit.unitName
    }));
  }

  //get job roles
  async getJobRoles(): Promise<string[]> {
    const jobRoles = await this.jobRoleRepository.find();
    return jobRoles.map(role => role.roleName);
  }

  //get org units
  async getOrgUnits(): Promise<string[]> {
    const orgUnits = await this.orgUnitRepository.find();
    return orgUnits.map(unit => unit.unitName);
  }
  
  
 //display resoures which team id is null and team id == teamId
  async getResourcesByTeamIdAndNull(teamId: number): Promise<{resourceId: string, roleName: string, unitName: string }[]> {
    // Fetch resources where teamId is the provided teamId or null
    const resources = await this.resourceRepository.find({ 
        where: [
            { teamId: teamId },
            { teamId: IsNull() }
        ],
        relations: ['job_role', 'org_unit'] 
    });

    // Sort resources so that resources with the same teamId come first
    resources.sort((a, b) => (a.teamId === b.teamId ? 0 : a.teamId ? -1 : 1));

    return resources.map(resource => ({
        resourceId: resource.resourceId,
        roleName: resource.job_role.roleName,
        unitName: resource.org_unit.unitName,
    }));
}

async getResourcesByTeamId(teamId: number, jobRole?: string, orgUnit?: string): Promise<{resourceId: string, roleName: string, unitName: string, teamId: number }[]> {
  // Start building the query
  let query = this.resourceRepository
    .createQueryBuilder('resource')
    .leftJoinAndSelect('resource.job_role', 'job_role')
    .leftJoinAndSelect('resource.org_unit', 'org_unit')
    .where('resource.teamId = :teamId', { teamId });

  // Add conditions for jobRole and orgUnit if they're defined
  if (jobRole) {
    query = query.andWhere('job_role.roleName = :jobRole', { jobRole });
  }
  if (orgUnit) {
    query = query.andWhere('org_unit.unitName = :orgUnit', { orgUnit });
  }

  // Execute the query
  const resources = await query.getMany();

  return resources.map(resource => ({
    resourceId: resource.resourceId,
    roleName: resource.job_role.roleName,
    unitName: resource.org_unit.unitName,
    teamId: resource.teamId,
  }));
}

// In your ResourceService
async getResourceById(resourceId: string): Promise<Resource> {
  const resource = await this.resourceRepository.findOne({ where: { resourceId } });
  if (!resource) {
    throw new NotFoundException(`Resource with id ${resourceId} not found`);
  }
  return resource;
}



}
