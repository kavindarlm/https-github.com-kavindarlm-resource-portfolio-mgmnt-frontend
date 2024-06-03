import { Resource } from "src/resource/entities/resource.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'job_role'})
export class JobRole {

    //Changed Primary Column to PrimaryGeneratedColumn
    @PrimaryGeneratedColumn()
    roleId: number;

    @Column()
    roleName: string;

    @OneToMany(() => Resource, resource => resource.job_role)
    resources: Resource[];
}
