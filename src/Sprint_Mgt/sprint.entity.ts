import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'sprint'})
export class Sprint{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique : true})
    Sname: string; 

    @Column({ type: 'date' }) // Assuming you want to store only the date without time
    Start_Date: Date;

    @Column({ type: 'date' }) // Assuming you want to store only the date without time
    End_Date: Date;

}

