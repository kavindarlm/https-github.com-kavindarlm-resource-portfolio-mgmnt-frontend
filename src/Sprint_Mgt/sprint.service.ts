import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm';
import { Sprint } from './sprint.entity';
import { CreateSprintDto } from './dtos/create-sprint.dto';

@Injectable()
export class SprintService {
    constructor(@InjectRepository(Sprint) private readonly sprintRepository:
    Repository<Sprint>){}
        
    async create(dto: CreateSprintDto ){
        const sprint = this.sprintRepository.create(dto);

        return await this.sprintRepository.save(sprint)
    }

    findMany(){
        return this.sprintRepository.find();
    }

    async update(id: number, dto: CreateSprintDto){
        const sprint = await this.sprintRepository.findOne({where: {id}});
    

    //check whether that record extist

    Object.assign(sprint,dto);

    return await this.sprintRepository.save(sprint);

    }

    async delete(id: number){
        const sprint = await this.sprintRepository.findOne({where: {id}});
    

    //check whether that record extist

    return await this.sprintRepository.remove(sprint);

    }
}