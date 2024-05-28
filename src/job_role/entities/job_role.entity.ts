import { Resource } from "src/resource/entities/resource.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name: 'job_role'})
export class JobRole {

    @PrimaryColumn()
    roleId: number;

    @Column()
    roleName: string;

    @OneToMany(() => Resource, resource => resource.jobRole)
    resources: Resource[];
}
