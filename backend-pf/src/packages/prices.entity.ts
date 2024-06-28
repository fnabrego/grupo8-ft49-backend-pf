import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'packagesPrices',
})
export class PackagePrices {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Precio de un envelope
   */
  @Column({
    type: 'int',
    nullable: false,
  })
  ENVELOP: number;

  /**
   * Precio de un paquete small
   */
  @Column({
    type: 'int',
    nullable: false,
  })
  SMALL: number;
  /**
   * Precio de un paquete medium
   */
  @Column({
    type: 'int',
    nullable: false,
  })
  MEDIUM: number;

  /**
   * Precio de un paquete large
   */
  @Column({
    type: 'int',
    nullable: false,
  })
  LARGE: number;
}
