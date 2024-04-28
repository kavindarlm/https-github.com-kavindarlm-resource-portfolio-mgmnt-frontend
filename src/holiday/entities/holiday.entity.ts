import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'holiday' })
export class Holiday {
    @PrimaryGeneratedColumn()
    holy_id: number;

    @Column()
    date: Date;

    @Column()
    holy_type: string;

    @Column()
    createdAt: Date;
}
