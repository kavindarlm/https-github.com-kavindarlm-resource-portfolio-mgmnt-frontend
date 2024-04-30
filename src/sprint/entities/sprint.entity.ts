import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'sprint'})
export class Sprint {
    @PrimaryGeneratedColumn()
    sprint_id: number;

    @Column({unique : true})
    sprint_name: string; 

    @Column({ type: 'date' }) 
    start_Date: Date;

    @Column({ type: 'date' }) 
    end_Date: Date;
}
