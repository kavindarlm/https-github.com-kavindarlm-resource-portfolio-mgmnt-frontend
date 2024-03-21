import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'sprint'})
export class Sprint{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Sname: string; 


}