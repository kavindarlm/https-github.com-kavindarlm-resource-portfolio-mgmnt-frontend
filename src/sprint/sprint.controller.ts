import { Controller, Get, Post, Body, Param, NotFoundException, Put, Delete, UseGuards } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { Sprint } from './entities/sprint.entity';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { JwtAuthGuard } from 'src/Auth/jwtauthGuard';

@Controller('sprint')
@UseGuards(JwtAuthGuard)
export class SprintController {
  constructor(private readonly sprintService: SprintService) { }

  @Get()
  findAll() {
    return this.sprintService.findAll();
  }

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

  @Put(':sprint_id')
  async update(
    @Param('sprint_id') sprintId: number,
    @Body() updateSprintDto: UpdateSprintDto
  ): Promise<Sprint> {
    return this.sprintService.update(sprintId, updateSprintDto);
  }

  @Delete(':sprint_id')
  async delete(@Param('sprint_id') sprintId: number): Promise<void> {
    return this.sprintService.delete(sprintId);
  }

}
