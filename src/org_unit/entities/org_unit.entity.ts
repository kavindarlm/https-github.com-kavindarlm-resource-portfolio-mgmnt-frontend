import { Resource } from "src/resource/entities/resource.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'org_unit' })
export class OrgUnit {

    @PrimaryGeneratedColumn()
    unitId: number;

    @Column({ unique: true })
    unitName: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    parentId: number;

    @Column()
    createdAt: Date;

    @OneToMany(() => Resource, resource => resource.org_unit)
    resources: Resource[];

}
