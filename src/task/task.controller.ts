/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { createTaskDto } from './dto/createTask.dto';
import { Task } from './entities/task.entity';
import { updateTaskDetailsDto, updateTaskDto } from './dto/updateTask.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('newtask/:id')
  createTask(
    @Param('id') projectid: string,
    @Body() createTaskDto: createTaskDto,
  ) {
    return this.taskService.createTask(parseInt(projectid, 10), createTaskDto);
  }

  @Get(':id')
  getTaskById(@Param('id') taskid: number): Promise<Task> {
    return this.taskService.findTaskById(taskid);
  }

  @Put(':id')
  async UpdateTask(
    @Param('id') taskid: number,
    @Body() updateTaskDto: updateTaskDto,
  ) {
    await this.taskService.updateTask(taskid.toString(), updateTaskDto);
  }

  @Delete(':id')
  async DeleteTask(@Param('id') taskid: number) {
    await this.taskService.deleteTask(taskid.toString());
  }

  @Get('project/:id') // Endpoint to get tasks by project ID
  async getTasksByProjectId(@Param('id') projectId: string): Promise<Task[]> {
    return this.taskService.findTasksByProjectId(parseInt(projectId, 10));
  }

  @Put('updateTaskProgress/:id') // Endpoint to update task progress
  async updateTaskProgress(
    @Param('id') taskId: string,
    @Body() updateTaskDto: updateTaskDetailsDto,
  ){
    await this.taskService.updateTaskDetails(taskId, updateTaskDto);
  }
} 
