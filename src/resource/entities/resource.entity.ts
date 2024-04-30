import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { JobRole } from "src/job_role/entities/job_role.entity";
import { Team } from "src/team/entities/team.entity";
import { OrgUnit } from "src/org_unit/entities/org_unit.entity";

@Entity()
export class Resource {

    @PrimaryColumn()
    resourceId: string;//primary column

    @Column()
    resourceName: string;


    @ManyToOne(() => Team)
    @JoinColumn({ name: 'team_id' })
    teams: Team;


    @ManyToOne(() => JobRole)
    @JoinColumn({ name: 'roleId' })
    job_role: JobRole;


    @ManyToOne(() => OrgUnit)
    @JoinColumn({ name: 'unitId' })
    org_unit: OrgUnit;

    @Column()
    createdAt: Date;
}
