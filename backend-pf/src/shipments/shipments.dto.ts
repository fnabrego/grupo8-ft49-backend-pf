import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Locality } from 'src/localities/localities.entity';

export class ShipmentDto {
  /**
   * Localidad de origen del envío.
   * @example Rivadavia
   */
  @IsNotEmpty()
  locality_origin: Partial<Locality>;

  /**
   * Localidad de destino del envío.
   * @example San Martín
   */
  @IsNotEmpty()
  locality_destination: Partial<Locality>;

  /**
   * Dirección de origen del envío.
   * @example Calle Falsa 123
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address_origin: string;

  /**
   * Dirección de destino del envío.
   * @example Calle Falsa 321
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address_destination: string;
}
