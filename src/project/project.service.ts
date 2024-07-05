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
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(Resource) private resourceRepository: Repository<Resource>,
  ) {}

  // Create Project
  async createProject(createProjectDto: CreateProjectDto) {
    try {
      const deliveryManager = await this.resourceRepository.findOne({
        where: { resourceId: createProjectDto.deliveryManager_id },
      });
      const projectManager = await this.resourceRepository.findOne({
        where: { resourceId: createProjectDto.projectManager_id }
      });

      if (!deliveryManager) {
        throw new NotFoundException('Delivery Manager not found');
      }
      if (!projectManager) {
        throw new NotFoundException('Project Manager not found');
      }

      const newProject = this.projectRepository.create({
        ...createProjectDto, createdBy: { user_id: createProjectDto.createdBy } as User
      });

      return this.projectRepository.save(newProject);
    } catch (error) {
      throw new BadRequestException('Could not create the project');
    }
  }

  // Find all active projects
  findProjects(showProjects: number): Promise<Project[]> {
    return this.projectRepository
      .createQueryBuilder('project')
      .where('project.isActive = :isActive', { isActive: true })
      .orderBy('project.createdDate', 'DESC')
      .take(showProjects)
      .getMany();
  }

  // Find project by ID
  async findProjectById(projectId: number): Promise<Project> {
    try {
      const project = await this.projectRepository.findOne({
        where: { projectid: projectId, isActive: true },
      });
      if (!project) {
        throw new NotFoundException(`Project with ID ${projectId} not found`);
      }
      return project;
    } catch (error) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
  }

  // Soft delete project
  async deleteProject(projectid: number) {
    try {
      const project = await this.projectRepository.findOne({
        where: { projectid },
      });
      if (!project) {
        throw new NotFoundException(`Project with ID ${projectid} not found`);
      }

      project.isActive = false;
      await this.projectRepository.save(project);
      return { message: `Project with ID ${projectid} has been archived.` };
    } catch (error) {
      throw new BadRequestException('Could not archive project. Please check your request.');
    }
  }

  // Count active projects
  async countProjects(): Promise<number> {
    try {
      return await this.projectRepository.count({ where: { isActive: true } });
    } catch (error) {
      throw new BadRequestException('Could not count projects');
    }
  }

  // Update project details
  async updateProject(projectId: number, updateProjectDetails: UpdateProjectDto): Promise<Project> {
    try {
      const project = await this.projectRepository.findOne({ where: { projectid: projectId, isActive: true } });
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
        updatedBy: { user_id: updateProjectDetails.updatedBy } as User
      };

      await this.projectRepository.save(updatedProjectData);
      return this.findProjectById(projectId);
    } catch (error) {
      throw new BadRequestException('Could not update the project');
    }
  }

  // Count high criticality projects
  async countHighCriticalityProjects(): Promise<number> {
    try {
      return await this.projectRepository
        .createQueryBuilder('project')
        .where('project.criticality_id = :criticality_id', { criticality_id: '1' })
        .andWhere('project.isActive = :isActive', { isActive: true })
        .getCount();
    } catch (error) {
      throw new BadRequestException('Could not count high criticality projects');
    }
  }

  // Count low criticality projects
  async countLowCriticalityProjects(): Promise<number> {
    try {
      return await this.projectRepository
        .createQueryBuilder('project')
        .where('project.criticality_id = :criticality_id', { criticality_id: '3' })
        .andWhere('project.isActive = :isActive', { isActive: true })
        .getCount();
    } catch (error) {
      throw new BadRequestException('Could not count low criticality projects');
    }
  }

  // Count medium criticality projects
  async countMediumCriticalityProjects(): Promise<number> {
    try {
      return await this.projectRepository
        .createQueryBuilder('project')
        .where('project.criticality_id = :criticality_id', { criticality_id: '2' })
        .andWhere('project.isActive = :isActive', { isActive: true })
        .getCount();
    } catch (error) {
      throw new BadRequestException('Could not count medium criticality projects');
    }
  }

  // Search project by name
  async searchProject(alias: string) {
    return this.projectRepository.createQueryBuilder(alias)
      .where(`${alias}.isActive = :isActive`, { isActive: true });
  }

  // Get resource ID and name
  async getResourceNameAndId(): Promise<{ resourceId: string; resourceName: string }[]> {
    const resources = await this.resourceRepository.find({
      select: ['resourceId', 'resourceName'],
    });
    return resources.map(resource => ({
      resourceId: resource.resourceId,
      resourceName: resource.resourceName,
    }));
  }

  // Get resource by ID
  async getResourceNameById(resourceId: string): Promise<{ resourceId: string; resourceName: string }> {
    try {
      const resource = await this.resourceRepository.findOne({ where: { resourceId } });
      if (!resource) {
        throw new NotFoundException(`Resource with ID ${resourceId} not found`);
      }
      return { resourceId: resource.resourceId, resourceName: resource.resourceName };
    } catch (error) {
      throw new BadRequestException(`Could not fetch resource with ID ${resourceId}`);
    }
  }

  // Get projects by criticality ID
  async getProjectsByCriticality(criticalityId: number): Promise<Partial<Project>[]> {
    try {
      const projects = await this.projectRepository.find({
        where: { criticality_id: criticalityId, isActive: true },
        select: [
          'projectid',
          'projectName',
          'projectStartDate',
          'projectEndDate',
          'criticality_id',
          'projectManager_id',
          'deliveryManager_id',
          'projectDescription',
        ],
      });

      return projects || [];
    } catch (error) {
      throw new BadRequestException(`Could not get projects by criticality ID ${criticalityId}`);
    }
  }
}
