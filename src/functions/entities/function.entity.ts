import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsersFunction } from "src/users_function/entities/users_function.entity";


@Entity('functions')
export class Function {
    @PrimaryGeneratedColumn()
    function_id: number;

    @Column({})
    function_name: string;

    @OneToMany(() => UsersFunction, usersFunction => usersFunction.function)
    usersFunctions: UsersFunction[];
}
