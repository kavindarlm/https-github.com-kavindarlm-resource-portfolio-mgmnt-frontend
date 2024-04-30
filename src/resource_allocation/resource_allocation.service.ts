import { Injectable } from '@nestjs/common';
import { CreateResourceAllocationDto } from './dto/create-resource_allocation.dto';
import { UpdateResourceAllocationDto } from './dto/update-resource_allocation.dto';

@Injectable()
export class ResourceAllocationService {
  create(createResourceAllocationDto: CreateResourceAllocationDto) {
    return 'This action adds a new resourceAllocation';
  }

  findAll() {
    return `This action returns all resourceAllocation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resourceAllocation`;
  }

  update(id: number, updateResourceAllocationDto: UpdateResourceAllocationDto) {
    return `This action updates a #${id} resourceAllocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} resourceAllocation`;
  }
}
