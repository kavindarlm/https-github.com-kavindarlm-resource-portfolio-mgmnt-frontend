import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Resource {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    resourceName: string;

    @Column({unique:true})
    resourceId: string;

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
