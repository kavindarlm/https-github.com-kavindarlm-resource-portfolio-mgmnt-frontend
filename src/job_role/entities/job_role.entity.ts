import { Resource } from "src/resource/entities/resource.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany,  PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'job_role'})
export class JobRole {

    //Changed Primary Column to PrimaryGeneratedColumn
    @PrimaryGeneratedColumn()
    roleId: number;

    @Column()
    roleName: string;

    @OneToMany(() => Resource, resource => resource.job_role)
    resources: Resource[];

    @ManyToOne(() => User)
    @JoinColumn({name: 'created_by'})
    createdBy: User;

    @ManyToOne(() => User)
    @JoinColumn({name: 'last_updated_by'})
    updatedBy: User;
}
