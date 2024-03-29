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
        const project = await this.projectRepository.findOne({ where: { projectid: prjectid } });
        if (!project) {
            throw new NotFoundException(`Project with ID ${prjectid} not found`);
        }
        const newTask = this.taskRepository.create({...createTaskDetails, project});
        return this.taskRepository.save(newTask);
    }

    async findTaskById(taskid: number): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { taskid: taskid } });
        if (!task) {
            throw new NotFoundException(`Task with ID ${taskid} not found`);
        }
        return task;
    }

    updateTask(taskid:string, updateTaskDetails: updateTaskDto){
        return this.taskRepository.update(taskid, updateTaskDetails);
    }

    deleteTask(taskid: string){
        return this.taskRepository.delete(taskid);
    }

    // async findTasksByProjectId(projectid: number): Promise<Task[]> {
    //     return this.projectRepository.find({ where: { : projectid } });
    //   }
}
