import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sprint } from './entities/sprint.entity';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';

@Injectable()
export class SprintService {

  constructor(
    @InjectRepository(Sprint)
    private sprintRepository: Repository<Sprint>, // Inject the Sprint repository
  ) { }

  async findAll(): Promise<Sprint[]> {
    // Use the repository to find all sprints in the database
    return this.sprintRepository.find();
  }

  

  async create(createSprintDto: CreateSprintDto): Promise<Sprint> {
    // Create a new Sprint instance using the DTO
    const sprint = this.sprintRepository.create(createSprintDto);

    // Set the createdAt date to today's date
    sprint.createdAt = new Date();

    // Save the sprint to the database
    return this.sprintRepository.save(sprint);
  }

}
