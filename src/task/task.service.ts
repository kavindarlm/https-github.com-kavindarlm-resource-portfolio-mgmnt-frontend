import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import { createTaskDto } from './dto/createTask.dto';
import { updateTaskDto } from './dto/updateTask.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task) private taskRepository: Repository<Task>,
        @InjectRepository(Project) private projectRepository: Repository<Project>
    ){}

    async createTask(prjectid: number, createTaskDetails:createTaskDto){
        try {
            const project = await this.projectRepository.findOne({ where: { projectid: prjectid } });
            if (!project) {
                throw new NotFoundException(`Project with ID ${prjectid} not found`);
            }
            const newTask = this.taskRepository.create({...createTaskDetails, project});
            return await this.taskRepository.save(newTask);
        } catch (error) {
            throw new NotFoundException('Could not create task');
        }
    }

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

    async updateTask(taskid:string, updateTaskDetails: updateTaskDto){
        try {
            return await this.taskRepository.update(taskid, updateTaskDetails);
        } catch (error) {
            throw new NotFoundException('Could not update task');
        }
    }

    async deleteTask(taskid: string){
        try {
            const deleteResult = await this.taskRepository.delete(taskid);
            if (deleteResult.affected === 0) {
                throw new NotFoundException(`Task with ID ${taskid} not found`);
            }
            return deleteResult;
        } catch (error) {
            throw new NotFoundException('Could not delete task');
        }
    }

    async findTasksByProjectId(TaskProjectId: number): Promise<Task[]> {
        try {
            return await this.taskRepository.find({where: {project: {projectid: TaskProjectId}}});
        } catch (error) {
            throw new NotFoundException('Could not find tasks for the project');
        }
    }
}
