import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
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

    @Column({})
    user_role: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdTime: Date;

    @OneToMany(() => UsersFunction, usersFunction => usersFunction.user)
    usersFunctions: UsersFunction[];

    // Added deleted flag column
    @Column({ default: false })
    deleted: boolean;

    // New relationship to track who created the user
    @ManyToOne(() => User, user => user.createdUsers)
    @JoinColumn({ name: 'created_by' })
    createdBy: User;

    @OneToMany(() => User, user => user.createdBy)
    createdUsers:User[];

}
