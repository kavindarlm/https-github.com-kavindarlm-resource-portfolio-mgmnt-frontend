import { Holiday } from "src/holiday/entities/holiday.entity";
import { Resource } from "src/resource/entities/resource.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ResourceHoliday {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Resource, resource => resource.resourceHolidays)
    resource: Resource;

    @ManyToOne(() => Holiday, holiday => holiday.resourceHolidays)
    holiday: Holiday;
}
