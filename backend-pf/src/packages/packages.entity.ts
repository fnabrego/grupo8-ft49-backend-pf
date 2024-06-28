import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../orders/orders.entity';
import { PackageSize } from './packages.enum';

@Entity({
  name: 'packages',
})
export class Package {
  /**
   * Primary generated column, type uuid
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Package size, enum, not nullable.
   * @example medium
   */
  @Column({
    type: 'enum',
    enum: PackageSize,
    nullable: false,
  })
  size: PackageSize;

  /**
   * Package price, not nullable, type int
   */
  @Column({
    type: 'int',
    nullable: false,
  })
  package_price: number;

  @ManyToOne(() => Order, (order) => order.receipt)
  @JoinColumn({ name: 'order_id' })
  orders: Order;
}
