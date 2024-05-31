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
import { Resource } from 'src/resource/entities/resource.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(Resource) private resourceRepository: Repository<Resource>,
  ) {}

  //Create Project
  async createProject(createProjectDto: CreateProjectDto) {
    try {
      const deliveryManager = await this.resourceRepository.findOne({
        where: { resourceId: createProjectDto.deliveryManager_id },
      });
      const projectManager = await this.resourceRepository.findOne({
        where: { resourceId: createProjectDto.projectManager_id}
      })

      if (!deliveryManager) {
        throw new NotFoundException('Delivery Manager not found');
      }
      if(!projectManager){
        throw new NotFoundException('Project Manager not found');
      }

      const newProject = this.projectRepository.create({
        ...createProjectDto
      });

      return this.projectRepository.save(newProject);
    } catch (error) {
      throw new BadRequestException('Could not create the project');
    }
  }

  //Find all projects
  findPeojects(showProjects: number): Promise<Project[]> {
    return this.projectRepository
      .createQueryBuilder('project')
      .orderBy('project.createdDate', 'DESC')
      .take(showProjects)
      .getMany();
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
    try {
      return await this.projectRepository.count();
    } catch (error) {
      throw new BadRequestException('Could not count projects');
    }
  }

  //Update project details
  async updateProject(projectId: number, updateProjectDetails: UpdateProjectDto): Promise<Project> {
    try {
      const project = await this.projectRepository.findOne({ where: { projectid: projectId } });
      if (!project) {
        throw new NotFoundException(`Project with ID ${projectId} not found`);
      }

      let deliveryManager = project.deliveryManager;
      let projectManager = project.projectManager;

      if (updateProjectDetails.deliveryManager_id) {
        deliveryManager = await this.resourceRepository.findOne({
          where: { resourceId: updateProjectDetails.deliveryManager_id },
        });
        if (!deliveryManager) {
          throw new NotFoundException('Delivery Manager not found');
        }
      }

      if (updateProjectDetails.projectManager_id) {
        projectManager = await this.resourceRepository.findOne({
          where: { resourceId: updateProjectDetails.projectManager_id },
        });
        if (!projectManager) {
          throw new NotFoundException('Project Manager not found');
        }
      }

      const updatedProjectData = {
        ...project,
        ...updateProjectDetails,
        deliveryManager: deliveryManager,
        projectManager: projectManager,
      };

      await this.projectRepository.save(updatedProjectData);
      return this.findProjectById(projectId);
    } catch (error) {
      throw new BadRequestException('Could not update the project');
    }
  }

  //High critical project count
  async countHighCriticalityProjects(): Promise<number> {
    try {
      return await this.projectRepository
        .createQueryBuilder('project')
        .where('project.criticality_id = :criticality_id', { criticality_id: '1' })
        .getCount();
    } catch (error) {
      throw new BadRequestException('Could not count high criticality projects');
    }
  }

  //Low critical project count
  async countLowCriticalityProjects(): Promise<number> {
    try {
      return await this.projectRepository
        .createQueryBuilder('project')
        .where('project.criticality_id = :criticality_id', { criticality_id: '3' })
        .getCount();
    } catch (error) {
      throw new  BadRequestException('Could not count low criticality projects');
    }
  }

  //Medium critical project count
  async countMediumCriticalityProjects(): Promise<number> {
    try {
      return await this.projectRepository
        .createQueryBuilder('project')
        .where('project.criticality_id = :criticality_id', { criticality_id: '2' })
        .getCount();
    } catch (error) {
      throw new BadRequestException('Could not count medium criticality projects');
    }
  }

  //Search Project By Name
  async searchProject(alias: string) {
    return this.projectRepository.createQueryBuilder(alias);
  }

  //Get resource Id and the Resource name
  async getResourceNameAndId(): Promise<{ resourceId: string; resourceName: string }[]> {
    const resources = await this.resourceRepository.find({
      select: ['resourceId', 'resourceName'],
    });
    return resources.map(resource => ({
      resourceId: resource.resourceId,
      resourceName: resource.resourceName,
    }));
  }
}

