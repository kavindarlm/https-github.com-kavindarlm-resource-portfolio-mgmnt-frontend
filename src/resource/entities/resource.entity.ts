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

    @ManyToOne(() => Team, teams => teams.resources)
    @JoinColumn({ name: 'teamId' })
    teams: Team;

    @ManyToOne(() => OrgUnit, org_unit => org_unit.resources)
    @JoinColumn({ name: 'unitId' })
    org_unit: OrgUnit;

    @ManyToOne(() => JobRole, job_role => job_role.resources)
    @JoinColumn({ name: 'roleId' })
    job_role: JobRole;

    @OneToMany(() => ResourceHoliday, resourceHoliday => resourceHoliday.resource)
    resourceHolidays: ResourceHoliday[];

}
