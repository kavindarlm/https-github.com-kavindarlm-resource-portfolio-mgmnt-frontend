import { Column, Entity,  PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'teams' })
export class Team {
    @PrimaryGeneratedColumn()
    team_id: number;
  
    @Column()
    team_Name: string;

    @Column()
    team_description:string;

    @Column()
    createdAt: Date;    
}
