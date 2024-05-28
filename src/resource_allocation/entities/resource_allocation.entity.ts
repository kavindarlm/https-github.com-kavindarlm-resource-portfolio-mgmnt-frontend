import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sprint } from 'src/sprint/entities/sprint.entity';
import { Resource } from 'src/resource/entities/resource.entity';
import { Task } from 'src/task/entities/task.entity';

@Entity({ name: 'resource_allocation' })
export class ResourceAllocation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sprint)
  @JoinColumn({ name: 'sprint_id' })
  sprint: Sprint;

  @ManyToOne(() => Resource)
  @JoinColumn({ name: 'resource_id' })
  resource: Resource;

  @ManyToOne(() => Task)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @Column()
  percentage: number;
}
