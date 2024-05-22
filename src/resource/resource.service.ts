import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateResourceParams, UpdateResourceParams } from 'src/utils/types';
import { CreateResourceParams } from './dto/create-resource.dto';
import { UpdateResourceParams } from './dto/update-resource.dto';

@Injectable()
export class ResourceService {
  
  //to interact with database, inject typeorm repository in to our class
  constructor(@InjectRepository(Resource) private resourceRepository: Repository<Resource>,) {}


  findResources() {
      return this.resourceRepository.find();
  }

  async findOneResource(resourceId: string): Promise<Resource> {
    const resource = await this.resourceRepository.findOne({ where: { resourceId } });
    if (!resource) {
      throw new NotFoundException(`Resource with ID ${resourceId} not found.`);
    }
    return resource;
  }

  createResource(resourceDetails: CreateResourceParams) {
      const newResource = this.resourceRepository.create({...resourceDetails, createdAt: new Date()});
      return this.resourceRepository.save(newResource);
  }

  updateResource(resourceId: string, updateResourceDetails: UpdateResourceParams) {
      return this.resourceRepository.update({resourceId}, {...updateResourceDetails});
  }

  deleteResource(resourceId: string) {
      return this.resourceRepository.delete({ resourceId });
  }

  //methods for team management

  //display resources which do not have teamid only
//   async getResourcesWithoutTeamId(): Promise<Resource[]> {
//     const resources = await this.resourceRepository.find({ where: { teamId: IsNull() } });
//     console.log(resources);
//     return resources;
// }

  //display resources which do not have teamid only
  async getResourcesByTeamIdNull(): Promise<{resourceId: string, roleName: string, unitName: string }[]> {
    const resources = await this.resourceRepository.find({ 
        where: { teamId: IsNull() },
        relations: ['jobRole', 'orgUnit'] 
    });
    return resources.map(resource => ({
        resourceId: resource.resourceId,
        roleName: resource.jobRole.roleName,
        unitName: resource.orgUnit.unitName
    }));
  }
  
  
 //display resoures which team id is null and team id == teamId
  async getResourcesByTeamIdAndNull(teamId: number): Promise<{resourceId: string, roleName: string, unitName: string }[]> {
    // Fetch resources where teamId is the provided teamId or null
    const resources = await this.resourceRepository.find({ 
        where: [
            { teamId: teamId },
            { teamId: IsNull() }
        ],
        relations: ['jobRole', 'orgUnit'] 
    });

    // Sort resources so that resources with the same teamId come first
    resources.sort((a, b) => (a.teamId === b.teamId ? 0 : a.teamId ? -1 : 1));

    return resources.map(resource => ({
        resourceId: resource.resourceId,
        roleName: resource.jobRole.roleName,
        unitName: resource.orgUnit.unitName,
    }));
}


async getResourcesByTeamId(teamId: number): Promise<{resourceId: string, roleName: string, unitName: string, teamId: number }[]> {
  // Fetch resources where teamId is the provided teamId
  const resources = await this.resourceRepository.find({ 
      where: { teamId: teamId },
      relations: ['jobRole', 'orgUnit'] 
  });

  return resources.map(resource => ({
      resourceId: resource.resourceId,
      roleName: resource.jobRole.roleName,
      unitName: resource.orgUnit.unitName,
      teamId: resource.teamId, // Add this line
  }));
}

// // In your ResourceService
// async getResourceById(id: number): Promise<Resource> {
//   const resource = await this.resourceRepository.findOne({ where: { resource } });
//   if (!resource) {
//     throw new NotFoundException(`Resource with id ${id} not found`);
//   }
//   return resource;
// }



}
