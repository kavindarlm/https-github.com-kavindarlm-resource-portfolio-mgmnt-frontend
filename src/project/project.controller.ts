import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  NotFoundException,
  BadRequestException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/Auth/get-user.decorator';

@Controller('project')
@UseGuards(AuthGuard('jwt'))
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  //controller for getting all projects
  @Get()
  getPeojects() {
    return this.projectService.findPeojects(15);
  }

  //controller for creating a project
  @Post()
  async createProject(@Body() createProjectDtoo: CreateProjectDto, @GetUser() user: any) {
    try {
      createProjectDtoo.createdBy = user.id;
      const project = this.projectService.createProject(createProjectDtoo);
      return project;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          'Delivery Manager or Project Manager not found',
        );
      } else {
        throw new BadRequestException('Could not create the project');
      }
    }
  }

  //controller for getting a project by id
  @Get(':id')
  getProjectById(@Param('id') projectid: number): Promise<Project> {
    return this.projectService.findProjectById(projectid);
  }

  //controller for updating a project
  @Put(':id')
  async updateProject(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @GetUser() user: any,
  ): Promise<Project> {
    try {
      updateProjectDto.createdBy = user.id;
      return await this.projectService.updateProject(id, updateProjectDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //controller for deleting a project
  @Delete(':id')
  async DeleteProject(@Param('id') projectid: number) {
    await this.projectService.deleteProject(projectid.toString());
  }

  //controller for getting all projects count
  @Get('count/countprojects')
  async countProjects(): Promise<number> {
    return this.projectService.countProjects();
  }

  //controller for getting all projects with high criticality
  @Get('high-criticality/count')
  async countHighCriticalityProjects(): Promise<number> {
    return this.projectService.countHighCriticalityProjects();
  }

  //controller for getting all projects with low criticality
  @Get('low-criticality/count')
  async countLowCriticalityProjects(): Promise<number> {
    return this.projectService.countLowCriticalityProjects();
  }

  //controller for getting all projects with medium criticality
  @Get('Medium-criticality/count')
  async countMediumCriticalityProjects(): Promise<number> {
    return this.projectService.countMediumCriticalityProjects();
  }

  //  controller for searching projects by project name
  @Get('searchprojectName/search')
  async searchProjects(@Req() req: Request) {
    const builder = await this.projectService.searchProject('projects');
    if (req.query.s) {
      builder.where('projects.projectName like :s', { s: `%${req.query.s}%` });
    }
    return builder.getMany();
  }

  // controller for return all the resource id and resource name
  @Get('getResoure/bynameAndId')
  async getResourceNameAndId(): Promise<
    { resourceId: string; resourceName: string }[]
  > {
    return this.projectService.getResourceNameAndId();
  }

  // controller for getting resource name by resource id
  @Get('resourceNameById/:resourceId')
  async getResourceNameById(@Param('resourceId') resourceId: string) {
    try {
      return await this.projectService.getResourceNameById(resourceId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  // controller for getting project name and project ID by task ID
  @Get('getProjectByCriticalityId/:criticalityId')
  async getProjectsByCriticality(
    @Param('criticalityId', ParseIntPipe) criticalityId: number,
  ): Promise<Partial<Project>[]> {
    return await this.projectService.getProjectsByCriticality(criticalityId);
  }

  // controller for getting criticality count
  @Get('criticality/count')
  async countProjectsByCriticality(): Promise<{ high: number, low: number, medium: number }> {
    const high = await this.projectService.countHighCriticalityProjects();
    const low = await this.projectService.countLowCriticalityProjects();
    const medium = await this.projectService.countMediumCriticalityProjects();

    return { high, low, medium };
  }
  
}
