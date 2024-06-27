import { Locality } from 'src/localities/localities.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// import { v4 as uuid } from 'uuid';
@Entity()
export class ShippingPrice {
  /**
   * ID numérico de cada localidad.
   * @example 2
   */
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Locality, (locality) => locality.originShippingPrices, {
    eager: true,
  })
  @JoinColumn({ name: 'originLocality' })
  origin: Locality;

  @ManyToOne(() => Locality, (locality) => locality.destinationShippingPrices, {
    eager: true,
  })
  @JoinColumn({ name: 'destinationLocality' })
  destination: Locality;

  @Column('integer')
  price: number;
}
