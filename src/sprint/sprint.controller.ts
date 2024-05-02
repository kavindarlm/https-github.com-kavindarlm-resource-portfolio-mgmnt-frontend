import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { Sprint } from './entities/sprint.entity';

@Controller('sprint')
export class SprintController {
  constructor(private readonly sprintService: SprintService) { }


  @Get()
  findAll() {
    return this.sprintService.findAll();
  }

  // Route with parameter, defined after `last-id`
  @Get(':sprint_id')
  async findOneById(@Param('sprint_id') sprintId: number): Promise<Sprint> {
    const sprint = await this.sprintService.findOneById(sprintId);
    if (!sprint) {
      throw new NotFoundException(`Sprint with ID ${sprintId} not found`);
    }
    return sprint;
  }

  @Post()
  async create(@Body() createSprintDto: CreateSprintDto) {
    return await this.sprintService.create(createSprintDto);
  }


  @Get('name/:sprint_name')
  async findOneByName(@Param('sprint_name') sprintName: string): Promise<Sprint> {
      const sprint = await this.sprintService.findOneByName(sprintName);
      if (!sprint) {
          throw new NotFoundException(`Sprint with name ${sprintName} not found`);
      }
      return sprint;
  }
}
