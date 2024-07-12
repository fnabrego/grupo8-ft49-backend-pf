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
   * Columna primaria generada, escriba uuid
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Tamaño del paquete, enum, no anulable.
   * @example medium
   */
  @Column({
    type: 'enum',
    enum: PackageSize,
    nullable: false,
  })
  size: PackageSize;

  /**
   * Precio del paquete, no nullable, escriba int
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
