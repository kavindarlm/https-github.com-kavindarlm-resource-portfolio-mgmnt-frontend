import { Resource } from "src/resource/entities/resource.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity,  JoinColumn,  ManyToOne,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => User)
    @JoinColumn({ name: 'created_by' })
    createdBy: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'last_updated_by' })
    updatedBy: User;
}
