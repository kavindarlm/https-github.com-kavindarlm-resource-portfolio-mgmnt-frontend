import { Project } from "src/project/entities/project.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tasks" })
export class Task{
    @PrimaryGeneratedColumn({type: 'bigint'})
    taskid: number;

    @Column()
    taskName: string;

    @Column({ type: 'date' })
    exStartDate: string;

    @Column({ type: 'date' })
    exEndDate: string;

    @Column()
    taskDescription: string; 

    @Column()
    taskAllocationPercentage: number; 

    @Column()
    taskProgressPercentage: number;

    @ManyToOne(() => Project, (project) => project.tasks)
    project: Project;
}