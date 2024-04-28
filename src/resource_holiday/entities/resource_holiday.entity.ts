import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'resource_holiday' })
export class ResourceHoliday {
    @PrimaryGeneratedColumn()
    id: number;
}
