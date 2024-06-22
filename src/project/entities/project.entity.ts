/* eslint-disable prettier/prettier */
import { Criticality } from "src/criticality/entities/criticality.entity";
import { Resource } from "src/resource/entities/resource.entity";
import { Task } from "src/task/entities/task.entity";
import { User } from "src/user/entities/user.entity";
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

    @ManyToOne(() => Resource, resource => resource.projectss)
    @JoinColumn({name: 'projectManager_id'})
    projectManager: Resource;

    @Column()
    projectManager_id: string;

    @ManyToOne(() => Resource, resource => resource.projects)
    @JoinColumn({name: 'deliveryManager_id'})
    deliveryManager: Resource;

    @Column()
    deliveryManager_id: string;

    @Column()
    projectDescription: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdDate: Date;

    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[];

    @ManyToOne(() => User)
    @JoinColumn({ name: 'created_by'})
    createdBy: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'updated_by'})
    updatedBy: User;
}