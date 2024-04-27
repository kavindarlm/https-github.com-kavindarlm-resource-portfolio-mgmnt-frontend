import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'job_role'})
export class JobRole {

    @PrimaryColumn()
    roleId: number;

    @Column()
    roleName: string;
}
