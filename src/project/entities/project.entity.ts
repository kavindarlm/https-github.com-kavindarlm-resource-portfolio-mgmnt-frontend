/* eslint-disable prettier/prettier */
import { Task } from "src/task/entities/task.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "projects" })
export class Project {
    @PrimaryGeneratedColumn({type: 'bigint'})
    projectid: number;

    @Column()
    projectName: string; 

    @Column({ type: 'date' })
    projectStartDate: string;

    @Column({ type: 'date' })
    projectEndDate: string;

    @Column()
    criticality: string; 

    @Column()
    projectManager: string;

    @Column()
    deliveryManager: string;

    @Column()
    projectDescription: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdDate: Date;

    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[];
}