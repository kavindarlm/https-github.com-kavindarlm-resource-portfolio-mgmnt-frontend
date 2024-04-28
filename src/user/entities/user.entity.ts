import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { UsersFunction } from 'src/users_function/entities/users_function.entity';


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

    @CreateDateColumn({ type: 'timestamp' })
    createdTime: Date;

    @OneToMany(() => UsersFunction, usersFunction => usersFunction.user)
    usersFunctions: UsersFunction[];
}
