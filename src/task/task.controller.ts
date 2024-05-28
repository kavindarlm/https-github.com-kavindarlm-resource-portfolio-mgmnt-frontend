/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { createTaskDto } from './dto/createTask.dto';
import { Task } from './entities/task.entity';
import { updateTaskDetailsDto, updateTaskDto } from './dto/updateTask.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':taskId')
  async getProjectIdByTaskId(@Param('taskId') taskId: string): Promise<{ projectName: string, projectId: number } | null> {
      const projectInfo = await this.taskService.getProjectNameAndIdByTaskId(Number(taskId));
      return projectInfo;
  }
  
  @Post('newtask/:id')
  async createTask(
    @Param('id') projectId: string,
    @Body() createTaskDto: createTaskDto,
  ) {
    try {
      const task = await this.taskService.createTask(parseInt(projectId, 10), createTaskDto);
      return { success: true, data: task };
    } catch (error) {
      if (error instanceof BadRequestException) {
        // Handle validation errors
        return { success: false, message: error.message };
      } else {
        // Handle other types of errors
        return { success: false, message: 'Failed to create task.' };
      }
    }
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

  @Delete('deletetask/:id')
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

  @Get('sum-allocation/:id')
  async getSumAllocationPercentageByProjectId(@Param('id', ParseIntPipe) projectId: number): Promise<number> {
      const sum = await this.taskService.getSumOfAllocationPercentageByProjectId(projectId);
      return sum;
  }

  @Get('project-progress/:id')
  async getProjectProgress(@Param('id', ParseIntPipe) projectId: number): Promise<number> {
      const progress = await this.taskService.getProjectProgressByProjectId(projectId);
      return progress;
  }
}
