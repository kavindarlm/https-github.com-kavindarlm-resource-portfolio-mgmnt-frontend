import { JobRole } from "src/job_role/entities/job_role.entity";
import { OrgUnit } from "src/org_unit/entities/org_unit.entity";
import { ResourceHoliday } from "src/resource_holiday/entities/resource_holiday.entity";
import { Team } from "src/team/entities/team.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Resource {

    @PrimaryColumn()
    resourceId: string;//primary column

    @Column()
    resourceName: string;

    @Column()
    roleId: number;

    @Column()
    unitId: number;

    @Column({ nullable: true })
    teamId: number;

    @Column()
    createdAt: Date;

    @ManyToOne(() => Team, team => team.resources)
    @JoinColumn({ name: 'teamId' })
    team: Team;


    @ManyToOne(() => OrgUnit, orgUnit => orgUnit.resources)
    @JoinColumn({ name: 'unitId' })
    orgUnit: OrgUnit;

    @ManyToOne(() => JobRole, jobRole => jobRole.resources)
    @JoinColumn({ name: 'roleId' })
    jobRole: JobRole;


}
