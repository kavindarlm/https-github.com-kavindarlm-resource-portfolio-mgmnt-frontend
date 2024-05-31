import { Project } from "src/project/entities/project.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "criticality_type"})
export class Criticality {
    @PrimaryGeneratedColumn()
    criticality_id: number;

    @Column()
    description: string;

    @Column()
    type: string;

    @CreateDateColumn({ type: 'timestamp' })
    create_date: Date;

    @OneToMany(() => Project, (project => project.criticality))
    projects: Project[];
}
 