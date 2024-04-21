import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { Request } from 'express';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
    getPeojects(){
        return this.projectService.findPeojects(15);
    }

  @Post()
    createProject(@Body() createProjectDtoo: CreateProjectDto){
        this.projectService.createProject(createProjectDtoo);
    }

  @Get(':id')
  getProjectById(@Param('id') projectid: number): Promise<Project> {
    return this.projectService.findProjectById(projectid);
  }
 
  @Put(':id') 
  async UpdateProject(
    @Param('id') projectid: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    await this.projectService.updateProject(
      projectid.toString(),
      updateProjectDto,
    );
  }

  @Delete(':id')
  async DeleteProject(@Param('id') projectid: number) {
    await this.projectService.deleteProject(projectid.toString());
  }

  @Get('count/countprojects') // New route for counting projects
  async countProjects(): Promise<number> {
    return this.projectService.countProjects();
  }

  @Get('high-criticality/count')
  async countHighCriticalityProjects(): Promise<number> {
    return this.projectService.countHighCriticalityProjects();
  }

  @Get('low-criticality/count')
  async countLowCriticalityProjects(): Promise<number> {
    return this.projectService.countLowCriticalityProjects();
  }

  @Get('Medium-criticality/count')
  async countMediumCriticalityProjects(): Promise<number> {
    return this.projectService.countMediumCriticalityProjects();
  }

  @Get('searchprojectName/search')
  async searchProjects(@Req() req: Request){
    const builder = await this.projectService.searchProject('projects');;

    if(req.query.s){
      builder.where('projects.projectName like :s', {s: `%${req.query.s}%`});
    }

    return builder.getMany(); 
  }
}
