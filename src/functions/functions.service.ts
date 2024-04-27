import { Injectable } from '@nestjs/common';
import { CreateFunctionDto } from './dto/create-function.dto';
import { UpdateFunctionDto } from './dto/update-function.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Function } from './entities/function.entity';

@Injectable()
export class FunctionsService {
  constructor(@InjectRepository(Function) private functionRepo : Repository<Function>) {}

  create(createFunctionDto: CreateFunctionDto) {
    const function1= this.functionRepo.create(createFunctionDto);
    return this.functionRepo.save(function1);
  }

  findAll() {
    const allfunctions=this.functionRepo.find();
    return allfunctions;
  }

}
