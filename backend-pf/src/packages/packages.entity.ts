import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../orders/orders.entity";
import { PackageSize, PackageType } from "./packages.enum";

@Entity({
    name: "packages"
})
export class Package {
    /**
     * Primary generated column, type uuid
     */
    @PrimaryGeneratedColumn('uuid')
    id:string

    /**
     * Package type, enum, not nullable.
     * @example ENVELOP
     */
    @Column({
        type: "enum",
        enum: PackageType,
        nullable: false,
    })
    type: PackageType

    /**
     * Package size, enum, not nullable.
     * @example MEDIUM
     */
    @Column({
        type: "enum",
        enum: PackageSize,
        nullable: false
    })
    size: PackageSize

    /**
     * Package price, not nullable, type int
     */
    @Column({
        type: "int",
        nullable: false,
    })
    package_price: number

    @ManyToOne(() => Order, (order) => order.receipt)
    @JoinColumn({ name: 'order_id' })
    orders: Order;

}