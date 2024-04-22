import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Resource {

    @Column()
    resourceName: string;

    @PrimaryColumn({})
    resourceId: string;//primary column

    @Column()
    roleId: number;

    @Column({nullable:true})
    unitId: number;

    @Column()
    createdAt: Date;
}
