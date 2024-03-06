import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';


@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, default: 'New User'})
    title: string;

    @Column({})
    content: string;

    @Column({})
    description: string;

    // @Column({nullable:true})
    // image: string;

    @ManyToOne(()=>User, (user)=>user.posts)
    user: User;
}
