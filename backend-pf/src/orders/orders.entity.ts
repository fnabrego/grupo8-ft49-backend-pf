import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToMany,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import { User } from 'src/users/users.entity';
import { Shipment } from '../shipments/shipments.entity';
import { Package } from 'src/packages/packages.entity';
import { Receipt } from '../receipts/receipts.entity';

@Entity({
    name: 'orders',
})
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: Partial<User>;

    @OneToOne(() => Shipment, (shipment) => shipment.orders)
    shipments: Shipment;

    @OneToMany(() => Package, (packages) => packages.orders)
    @JoinColumn({ name: 'packages_id' })
    packages: Package[];

    @OneToOne(() => Receipt, (receipt) => receipt.orders)
    receipt?: Receipt;

    @Column()
    date: Date;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    final_price: number;

    @Column({
        type: 'varchar',
        length: 50,
    })
    status: string;

}