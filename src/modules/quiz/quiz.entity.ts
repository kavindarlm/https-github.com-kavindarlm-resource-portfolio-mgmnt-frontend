import { BaseEntity,Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity('quizes')
export class Quiz extends BaseEntity {
    @PrimaryGeneratedColumn({
        comment: 'Primary key of the quiz',
    })
    id: number;
    @Column({
        type: 'varchar',
    })
    name: string;

    @Column({
        type: 'text',
    })
    description: string;
}