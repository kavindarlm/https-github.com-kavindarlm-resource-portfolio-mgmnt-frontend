import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({nullable: false, default: 'New User'})
    user_name: string;

    @Column({})
    user_email: string;

    @Column({})
    password: string;
}
