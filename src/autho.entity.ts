import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity('users') //inside the entity decorator we can pass the name of the table
export class Autho {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({})
    name: string;

    @Column({unique: true})
    email: string;

    @Column({})
    password: string;
}
