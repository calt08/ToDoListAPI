import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    status: boolean;

    @Column()
    dueDate: Date;

    @ManyToOne(type => User, user => user.items)
    user: User;
}
