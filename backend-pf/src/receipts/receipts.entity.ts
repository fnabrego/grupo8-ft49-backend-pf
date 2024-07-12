import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";
import { Order } from "../orders/orders.entity";

@Entity({
    name: "receipts"
})
export class Receipt {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User, (user) => user.receipt)
    @JoinColumn({ name: 'user_id' })
    user: Partial<User>;

    @OneToOne(() => Order, (order) => order.receipt)
    order: Partial<Order>;

    @Column({
        type: 'varchar',
        length: 50,
        nullable:true
    })
    link?: string;
}