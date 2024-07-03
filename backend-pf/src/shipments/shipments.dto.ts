import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEmpty,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Locality } from 'src/localities/localities.entity';

export class ShipmentDto {
  @ApiProperty({
    example: { id: 1 },
  })
  @IsNotEmpty()
  locality_origin: Partial<Locality>;

  @ApiProperty({
    example: { id: 4 },
  })
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

  @ApiHideProperty()
  @IsEmpty()
  shipment_price: number;
}
