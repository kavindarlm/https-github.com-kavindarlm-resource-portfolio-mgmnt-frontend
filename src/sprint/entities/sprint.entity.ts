import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    createdAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({name: 'createdBy'})
    createdBy: User;

    @ManyToOne(() => User)
    @JoinColumn({name: 'last_updatedBy'})
    updatedBy: User;

}
