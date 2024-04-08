import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Resource {
    // @PrimaryGeneratedColumn()
    // id:number;

    @Column()
    resourceName: string;

    @PrimaryColumn({})
    resourceId: string;//primary column

    @Column()
    roleId: number;

    // @Column()
    // jobRole: string;

    @Column({nullable:true})
    unitId: number;

    // @Column({nullable:true})
    // orgUnit: string;

    @Column()
    createdAt: Date;
}
