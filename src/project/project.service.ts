import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  //Create Project
  async createProject(userDetails: CreateProjectDto) {
    try {
      const newPoject = this.projectRepository.create(userDetails);
      return this.projectRepository.save(newPoject);
    } catch (error) {
      throw new BadRequestException('Could not create the project');
    }
  }

  //Find all projects
  findPeojects() {
    return this.projectRepository.find();
  }

  //finfProject by ID
  async findProjectById(projectId: number): Promise<Project> {
    try {
      const project = await this.projectRepository.findOne({
        where: { projectid: projectId },
      });
      if (!project) {
        throw new NotFoundException(`Project with ID ${projectId} not found`);
      }
      return project;
    } catch (error) {
      throw new NotFoundException(`Project with ID ${projectId}  not found`);
    }
  }

  ///Delete project
  async deleteProject(projectid: string) {
    try {
      const deleteResult = await this.projectRepository.delete(projectid);
      if (deleteResult.affected === 0) {
        throw new NotFoundException(`Project with ID ${projectid} not found`);
      }
      return deleteResult;
    } catch (error) {
      throw new BadRequestException(
        'Could not delete project. Please check your request.',
      );
    }
  }

  //Count project
  async countProjects(): Promise<number> {
    return this.projectRepository.count();
  }

  //Update project details
  updateProject(prjectid: string, updateProjectDetails: UpdateProjectDto) {
    return this.projectRepository.update(prjectid, updateProjectDetails);
  }

  //High critical project count
  async countHighCriticalityProjects(): Promise<number> {
    return this.projectRepository
      .createQueryBuilder('project')
      .where('project.criticality = :criticality', { criticality: 'high' })
      .getCount();
  }

  //Low critical project count
  async countLowCriticalityProjects(): Promise<number> {
    return this.projectRepository
      .createQueryBuilder('project')
      .where('project.criticality = :criticality', { criticality: 'low' })
      .getCount();
  }

  //Medium critical project count
  async countMediumCriticalityProjects(): Promise<number> {
    return this.projectRepository
      .createQueryBuilder('project')
      .where('project.criticality = :criticality', { criticality: 'Medium' })
      .getCount();
  }
}
