import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';

@Controller('sprint')
export class SprintController {
  constructor(private readonly sprintService: SprintService) { }

  @Get()
  findAll() {
    return this.sprintService.findAll();
  }

  @Post()
  async create(@Body() createSprintDto: CreateSprintDto) {
    // Use the sprintService to create a new sprint
    return await this.sprintService.create(createSprintDto);
  }


}
