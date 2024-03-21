import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from '../../post/entities/post.entity';


@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, default: 'New User'})
    name: string;

    @Column({})
    email: string;

    @Column({})
    password: string;

    @OneToMany(()=>Post, (post)=>post.user)
    posts: Post[];
}
