import { Locality } from 'src/localities/localities.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class ShippingPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Locality, (locality) => locality.originShippingPrices, {
    eager: true,
  })
  origin: Locality;

  @ManyToOne(() => Locality, (locality) => locality.destinationShippingPrices, {
    eager: true,
  })
  destination: Locality;

  @Column('integer')
  price: number;
}
