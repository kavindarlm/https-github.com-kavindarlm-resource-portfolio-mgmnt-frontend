/* eslint-disable prettier/prettier */
import { Criticality } from "src/criticality/entities/criticality.entity";
import { Task } from "src/task/entities/task.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(()=> Criticality, criticality => criticality.projects)
    @JoinColumn({name: 'criticality_id'})
    criticality: Criticality;

    @Column()
    criticality_id: number;

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