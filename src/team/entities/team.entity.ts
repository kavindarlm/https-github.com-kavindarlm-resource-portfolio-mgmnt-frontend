import { Resource } from "src/resource/entities/resource.entity";
import { Column, CreateDateColumn, Entity,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'teams' })
export class Team {
    @PrimaryGeneratedColumn()
    teamId: number;
  
    @Column()
    team_Name: string;

    @Column()
    team_description:string;

    @CreateDateColumn()
    createdAt: Date;    

    @OneToMany(() => Resource, resource => resource.teams)
    resources: Resource[];
}
