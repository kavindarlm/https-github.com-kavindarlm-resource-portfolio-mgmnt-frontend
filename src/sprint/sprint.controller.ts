import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { Sprint } from './entities/sprint.entity';

@Controller('sprint')
export class SprintController {
  constructor(private readonly sprintService: SprintService) { }

  @Get()
  findAll() {
    return this.sprintService.findAll();
  }

  @Get(':sprint_id')
  async findOneById(@Param('sprint_id') sprint_id: number): Promise<Sprint> {
    const sprint = await this.sprintService.findOneById(sprint_id);
    if (!sprint) {
      // Handle the case where no sprint is found with the given ID
      throw new NotFoundException(`Sprint with ID ${sprint_id} not found`);
    }
    return sprint;
  }


  @Post()
  async create(@Body() createSprintDto: CreateSprintDto) {
    // Use the sprintService to create a new sprint
    return await this.sprintService.create(createSprintDto);
  }


}
