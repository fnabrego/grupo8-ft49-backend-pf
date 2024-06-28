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
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({
    example: { id: 1 },
    description: 'Numeric ID of the origin location',
  })
  @ManyToOne(() => Locality, (locality) => locality.shipment_origin)
  @JoinColumn({ name: 'locality_origin' })
  locality_origin: Locality;

  @ApiProperty({
    example: { id: 4 },
    description: 'Numeric ID of the destination location',
  })
  @ManyToOne(() => Locality, (locality) => locality.shipment_destination)
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
