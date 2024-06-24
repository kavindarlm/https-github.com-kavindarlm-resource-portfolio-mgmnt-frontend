import { Project } from "src/project/entities/project.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ default: 'No description provided' }) 
    taskDescription: string; 

    @Column()
    taskAllocationPercentage: number; 

    @Column({ default: 0 })
    taskProgressPercentage: number;

    @ManyToOne(() => Project, (project) => project.tasks)
    @JoinColumn({ name: 'TaskProjectId' })
    project: Project;

    @Column({ type: 'timestamp' })
    createdTime: Date;
    
    @ManyToOne(() => User)
    @JoinColumn({ name: 'created_by'})
    createdBy: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'last_updated_by'})
    updatedBy: User;
}  