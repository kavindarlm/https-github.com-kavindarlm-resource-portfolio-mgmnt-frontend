import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Criticality } from './entities/criticality.entity';
import { Repository } from 'typeorm';
// import { CreateCriticalityDto } from './dto/create-criticality.dto';
// import { UpdateCriticalityDto } from './dto/update-criticality.dto';

@Injectable()
export class CriticalityService {
  
  constructor(@InjectRepository(Criticality) private criticalityRepository: Repository<Criticality>){}

  async getCriticality(): Promise<Criticality[]> {
    return await this.criticalityRepository.find();
  }
  // create(createCriticalityDto: CreateCriticalityDto) {
  //   return 'This action adds a new criticality';
  // }

  // findAll() {
  //   return `This action returns all criticality`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} criticality`;
  // }

  // update(id: number, updateCriticalityDto: UpdateCriticalityDto) {
  //   return `This action updates a #${id} criticality`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} criticality`;
  // }
}
