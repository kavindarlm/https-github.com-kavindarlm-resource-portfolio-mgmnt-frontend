/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
