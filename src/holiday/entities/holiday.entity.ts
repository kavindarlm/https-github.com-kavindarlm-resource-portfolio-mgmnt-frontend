import { ResourceHoliday } from "src/resource_holiday/entities/resource_holiday.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Holiday {
    @PrimaryGeneratedColumn()
    holy_id: number;

    @Column()
    date: Date;

    @Column()
    holy_type: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => ResourceHoliday, resourceHoliday => resourceHoliday.holiday)
    resourceHolidays: ResourceHoliday[];

    @ManyToOne(() => User)
    @JoinColumn({ name: 'created_by' })
    createdBy: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'updated_by' })
    updatedBy: User;
}
