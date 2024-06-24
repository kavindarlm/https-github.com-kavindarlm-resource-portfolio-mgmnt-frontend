import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sprint } from './entities/sprint.entity';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { User } from 'src/user/entities/user.entity';

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

  async findOneById(sprint_id: number): Promise<Sprint | null> {
    return this.sprintRepository.findOne({
      where: {
        sprint_id: sprint_id, // Use the correct property name from the entity
      }
    });
  }

  async create(createSprintDto: CreateSprintDto): Promise<Sprint> {
    // Create a new Sprint instance using the DTO
    const sprint = this.sprintRepository.create({...createSprintDto, createdBy: {user_id: createSprintDto.createdBy} as User});

    // Set the createdAt date to today's date
    sprint.createdAt = new Date();

    // Save the sprint to the database
    return this.sprintRepository.save(sprint);
  }

  // Method to find a sprint by its name
  async findOneByName(sprintName: string): Promise<Sprint | null> {
    return this.sprintRepository.findOne({
      where: {
        sprint_name: sprintName,
      },
    });
  }

  //Method to update sprint
  async update(sprint_id: number, updateSprintDto: UpdateSprintDto): Promise<Sprint> {
    const sprint = await this.findOneById(sprint_id);
    if (!sprint) {
      throw new NotFoundException(`Sprint with ID ${sprint_id} not found`);
    }

    // Update the sprint's properties
    Object.assign(sprint, updateSprintDto);

    sprint.updatedBy = {user_id: updateSprintDto.updatedBy} as User;

    // Save the updated sprint to the database
    return this.sprintRepository.save(sprint);
  }

  // Method to delete a sprint by its ID
  async delete(sprint_id: number): Promise<void> {
    const sprint = await this.findOneById(sprint_id);
    if (!sprint) {
      throw new NotFoundException(`Sprint with ID ${sprint_id} not found`);
    }
    await this.sprintRepository.remove(sprint);
  }

}
