import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({nullable: true})
    teamId: number;

    @Column()
    createdAt: Date;
}
