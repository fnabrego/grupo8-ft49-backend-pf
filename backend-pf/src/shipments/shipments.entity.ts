import { Locality } from 'src/localities/localities.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Order } from '../orders/orders.entity';

@Entity({
  name: 'shipments',
})
export class Shipment {
  /**
   * ID del envío, de tipo UUID, generado automáticamente.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @OneToOne(() => Order, (order) => order.shipments)
  @JoinColumn()
  orders: Order;

  /**
   * Localidad de origen del envío.
   * @example Rivadavia
   */
  @ManyToOne(() => Locality, (locality) => locality.shipment_origin)
  @JoinColumn({ name: 'locality_origin' })
  locality_origin: Locality;

  /**
   * Localidad de destino del envío.
   * @example San Martín
   */
  @ManyToOne(() => Locality, (locality) => locality.id)
  @JoinColumn({ name: 'locality_destination' })
  locality_destination: Locality;

  /**
   * Dirección de origen del envío.
   * @example Calle Falsa 123
   */
  @Column({ type: 'varchar', length: 60, nullable: false })
  address_origin: string;

  /**
   * Dirección de destino del envío.
   * @example Calle Falsa 321
   */
  @Column({ type: 'varchar', length: 60, nullable: false })
  address_destination: string;

  /**
   * Precio total del envío.
   * @example 4000
   */
  @Column({ type: 'int' })
  shipment_price: number;
}
