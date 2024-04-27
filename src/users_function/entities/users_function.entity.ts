import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Function } from '../../functions/entities/function.entity';

@Entity('users_function')
export class UsersFunction {
    @PrimaryGeneratedColumn()
    user_function_id: number;

    @Column()
    user_id: number;

    @ManyToOne(() => User, user => user.usersFunctions)
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column()
    function_id: number;

    @ManyToOne(() => Function, func => func.usersFunctions)
    @JoinColumn({name: 'function_id'})
    function: Function;

}
