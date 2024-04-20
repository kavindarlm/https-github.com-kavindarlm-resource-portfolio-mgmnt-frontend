import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResourceParams, UpdateResourceParams } from 'src/utils/types';

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
}
