import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToMany,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import { Users } from 'src/users/users.entity';
import { Shipment } from 'src/shipment/shipments.entity';
import { Packages } from 'src/packages/packages.entity';
import { Receipts } from 'src/receipt/receipt.entity';

@Entity({
    name: 'orders',
})
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Users, (user) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @OneToOne(() => Shipment, (shipment) => shipment.orders)
    shipments: Shipment;

    @OneToMany(() => Packages, (packages) => packages.orders)
    @JoinColumn({ name: 'packages_id' })
    packages: Packages[];

    @OneToOne(() => Receipts, (receipt) => receipt.orders)
    receipt: Receipts;

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