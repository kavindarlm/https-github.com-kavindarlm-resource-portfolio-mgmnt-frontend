import { ResourceHoliday } from "src/resource_holiday/entities/resource_holiday.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
}
