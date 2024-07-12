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
import { statusOrder } from './statusOrder.enum';

@Entity({
  name: 'orders',
})
export class Order {
  /**
   * @description ID de la Orden
   * @example 'd290f1ee-6c54-4b01-90e6-d701748f0851'
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * @description Datos de usuario
   */
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Partial<User>;

  /**
   * @description Datos del envío
   */
  @OneToOne(() => Shipment, (shipment) => shipment.orders)
  shipments: Shipment;

  /**
   * @description Datos del paquete
   */
  @OneToMany(() => Package, (packages) => packages.orders)
  @JoinColumn({ name: 'packages_id' })
  packages: Package[];

  /**
   * @description Datos del recibo/factura
   */
  @OneToOne(() => Receipt, (receipt) => receipt.order)
  @JoinColumn({ name: 'receipt_id' })
  receipt: Receipt;

  /**
   * @description Fecha de generación de Orden
   */
  @Column()
  date: Date;

  /**
   * @description Precio final de la orden
   * @example '1000'
   */
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  final_price: number;

  /**
   * @description Estado de la orden
   * @example 'Acepted'
   */
  @Column({
    type: 'enum',
    enum: statusOrder,
    nullable: false,
  })
  status: statusOrder;

  /**
   * @description Estado eliminacion, en false indica que existe
   * @example 'false'
   */
  @Column({ default: false })
  isDeleted: boolean;
}
