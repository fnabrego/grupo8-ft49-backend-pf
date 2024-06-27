import { ShippingPrice } from 'src/shipments/prices/shippingprices.entity';
import { Shipment } from 'src/shipments/shipments.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { v4 as uuid } from 'uuid';
@Entity({
  name: 'localities',
})
export class Locality {
  /**
   * ID de la localidad, de tipo number, generado automáticamente.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Nombre de la localidad.
   * @example Rivadavia
   */
  @Column({ type: 'varchar' })
  name: string;

  /**
   * Envíos que tienen como punto de origen esta localidad.
   */
  @OneToMany(() => Shipment, (shipment) => shipment.locality_origin)
  shipment_origin: Shipment[];

  /**
   * Envíos que tienen como punto de destino esta localidad.
   */
  @OneToMany(() => Shipment, (shipment) => shipment.locality_destination)
  shipment_destination: Shipment[];

  @OneToMany(() => ShippingPrice, (shippingPrice) => shippingPrice.origin)
  originShippingPrices: ShippingPrice[];

  @OneToMany(() => ShippingPrice, (shippingPrice) => shippingPrice.destination)
  destinationShippingPrices: ShippingPrice[];
}
