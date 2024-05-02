import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sprint } from 'src/sprint/entities/sprint.entity';
import { Resource } from 'src/resource/entities/resource.entity';
import { Task } from 'src/task/entities/task.entity';

@Entity({ name: 'resource_allocation' })
export class CreateResourceAllocationDto {

  @PrimaryGeneratedColumn()
  id: number;
  sprint_id: number;
  resource_id: string;
  task_id: number;
  percentage: number;

}
