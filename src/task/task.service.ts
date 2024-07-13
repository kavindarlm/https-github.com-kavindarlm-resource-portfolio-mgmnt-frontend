import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import { createTaskDto } from './dto/createTask.dto';
import { updateTaskDetailsDto, updateTaskDto } from './dto/updateTask.dto';
import { ResourceAllocation } from 'src/resource_allocation/entities/resource_allocation.entity';
import { Resource } from 'src/resource/entities/resource.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task) private taskRepository: Repository<Task>,
        @InjectRepository(Project) private projectRepository: Repository<Project>,
        @InjectRepository(ResourceAllocation) private resourceAllocationRepository: Repository<ResourceAllocation>,
        @InjectRepository(Resource) private resourceRepository: Repository<Resource>
    ) { }

    //Service for finding project name and project ID by task ID
    async getProjectNameAndIdByTaskId(taskId: number): Promise<{ projectName: string, projectId: number } | null> {
        const task = await this.taskRepository.findOne({
            where: { taskid: taskId },
            relations: ['project']
        });
        if (task && task.project) {
            return {
                projectName: task.project.projectName,
                projectId: task.project.projectid
            };
        }
        return null;
    }

    //service for creating task
    async createTask(projectId: number, createTaskDetails: createTaskDto) {
        try {
            const project = await this.projectRepository.findOne({ where: { projectid: projectId }, relations: ['tasks'] });
            if (!project) {
                throw new NotFoundException(`Project with ID ${projectId} not found`);
            }

            // Calculate the sum of existing task allocation percentages for the project
            const totalAllocationPercentage = project.tasks.reduce((sum, task) => sum + task.taskAllocationPercentage, 0);

            // Check if adding the new task will exceed 100% allocation
            if (totalAllocationPercentage + createTaskDetails.taskAllocationPercentage > 100) {
                throw new BadRequestException('Sum of task allocation percentages exceeds 100% for this project');
            }

            // Check if adding the new task will reach exactly 100% allocation after considering the new task
            // if (totalAllocationPercentage + createTaskDetails.taskAllocationPercentage === 100) {
            //     throw new BadRequestException('Adding this task will reach 100% allocation for this project');
            // }

            const newTask = this.taskRepository.create({ ...createTaskDetails, project, createdBy: {user_id : createTaskDetails.createdBy} as User, createdTime: new Date() });
            return await this.taskRepository.save(newTask);
        } catch (error) {
            throw new InternalServerErrorException(`Failed to create task: ${error.message}`);
        }
    }

    //service for find task by id
    async findTaskById(taskid: number): Promise<Task> {
        try {
            const task = await this.taskRepository.findOne({ where: { taskid: taskid } });
            if (!task) {
                throw new NotFoundException(`Task with ID ${taskid} not found`);
            }
            return task;
        } catch (error) {
            throw new NotFoundException('Could not find task');
        }
    } 

    //service for updating task Progress
    async updateTask(taskid: string, updateTaskDetails: updateTaskDto) {
        try {
            return await this.taskRepository.update(taskid, updateTaskDetails);
        } catch (error) {
            throw new NotFoundException('Could not update task');
        }
    }

    //service for deleting task
    async deleteTask(taskid: string) {
        try {
            const deleteResult = await this.taskRepository.delete(taskid);
            if (deleteResult.affected === 0) {
                throw new NotFoundException(`Task with ID ${taskid} not found`);
            }
            return deleteResult;
        } catch (error) {
            throw new NotFoundException('Could not delete task please check resource allocation and try again');
        } 
    }

    //service for find tasks of project by id
    async findTasksByProjectId(TaskProjectId: number): Promise<Task[]> {
        try {
            return await this.taskRepository.find({ where: { project: { projectid: TaskProjectId } } });
        } catch (error) {
            throw new NotFoundException('Could not find tasks for the project');
        }
    }

    //service for update task Details
    async updateTaskDetails(taskid: number, updateTaskDetails: updateTaskDetailsDto) {
        try {
            const task = await this.taskRepository.findOne({ where: { taskid: taskid } });
            if (!task) {
                throw new NotFoundException(`Task with ID ${taskid} not found`);
            }
            Object.assign(task, updateTaskDetails);
            task.updatedBy = { user_id: updateTaskDetails.updatedBy } as User; // Update the userId
            return await this.taskRepository.save(task);
        } catch (error) {
            throw new NotFoundException('Could not update task');
        }   
    }

    //service to get the sum of allocation percetage of tasks by project ID
    async getSumOfAllocationPercentageByProjectId(TaskProjectId: number): Promise<number> {
        try {
            const tasks = await this.taskRepository.find({ where: { project: { projectid: TaskProjectId } } });
            if (!tasks || tasks.length === 0) {
                throw new NotFoundException(`Tasks for project ID ${TaskProjectId} not found`);
            }

            //sum of allocation percentage
            const sum = tasks.reduce((accumulator, currentTask) => {
                return accumulator + currentTask.taskAllocationPercentage;
            }, 0);

            return sum;
        } catch (error) {
            // throw new NotFoundException('Could not find tasks for the project');
        }
    }

    async getProjectProgressByProjectId(ProjectId: number): Promise<number> {
        try {
            // Retrieve all tasks for the project
            const tasks = await this.taskRepository.find({ where: { project: { projectid: ProjectId } } });

            if (!tasks || tasks.length === 0) {
                throw new NotFoundException(`Tasks for project ID ${ProjectId} not found`);
            }

            // Calculate the weighted sum of task progress percentages
            const weightedSum = tasks.reduce((accumulator, currentTask) => {
                return accumulator + ((currentTask.taskAllocationPercentage / 100) * (currentTask.taskProgressPercentage / 100));
            }, 0);

            // Calculate the total weight (sum of task allocation percentages)
            const totalWeight = tasks.reduce((accumulator, currentTask) => {
                return accumulator + (currentTask.taskAllocationPercentage / 100);
            }, 0);

            // Ensure the total weight is equal to 1 (100%)
            if (totalWeight !== 1) {
                // throw new Error('Total weight of task allocation percentages should be equal to 100%');
            }

            // Calculate the project progress percentage
            const projectProgress = weightedSum * 100; // Total weight is already 1, so no need to divide

            // Round the project progress to the first decimal place
            const roundedProjectProgress = parseFloat(projectProgress.toFixed(1));

            return roundedProjectProgress;
        } catch (error) {
            // throw new NotFoundException('Could not calculate project progress');
            
        }
    }

    //Service for search Task by name
    async searchTask(alias: string) {
        return this.taskRepository.createQueryBuilder(alias)
    }

    //Service for get resources by project ID
    async getResourcesByProjectId(projectId: number): Promise<Resource[]> {
        const resourceAllocations = await this.resourceAllocationRepository
            .createQueryBuilder('resourceAllocation')
            .innerJoinAndSelect('resourceAllocation.task', 'task')
            .innerJoinAndSelect('task.project', 'project')
            .innerJoinAndSelect('resourceAllocation.resource', 'resource')
            .where('project.projectid = :projectId', { projectId })
            .getMany();

        // Extract resources from resource allocations
        const resources = resourceAllocations.map(ra => ra.resource);

        // Filter out duplicate resources based on resourceId
        const uniqueResourcesMap = new Map<string, Resource>();
        resources.forEach(resource => {
            uniqueResourcesMap.set(resource.resourceId, resource);
        });

        return Array.from(uniqueResourcesMap.values());
    }


    async getNotCompletedProjectCount(): Promise<number> {
        try {
            // Get all projects
            const projects = await this.projectRepository.find({where: {isActive: true}});

            let notCompletedProjectCount = 0;

            // Calculate the progress for each project and count the ones with progress < 100
            for (const project of projects) {
                const progress = await this.getProjectProgressByProjectId(project.projectid);
                if (progress < 100 && progress > 0) {
                    notCompletedProjectCount++;
                }
            }

            return notCompletedProjectCount;
        } catch (error) {
            throw new InternalServerErrorException('Failed to get the count of not completed projects');
        }
    }
}
