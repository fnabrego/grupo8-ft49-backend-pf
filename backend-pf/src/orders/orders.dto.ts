import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { PackageDto } from '../packages/packages.dto';
import { ShipmentDto } from '../shipments/shipments.dto';
import { statusOrder } from './statusOrder.enum';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Recibe el tamaño de paquete',
    example: { size: 'medium' },
  })
  @IsNotEmpty()
  packages: PackageDto;

  @ApiProperty({
    description: 'Recibe los datos de envío',
    example: {
      locality_origin: {
        id: 1,
      },
      locality_destination: {
        id: 4,
      },
      address_origin: 'Av. Principal 123',
      address_destination: 'Av. Secundaria 123',
    },
  })
  @IsNotEmpty()
  shipment: ShipmentDto;

  @ApiProperty({
    description: 'Recibe el objeto extraído del json de paypal, donde figura toda la info de pago',
    example: {},
  })
  @IsNotEmpty()
  dataPayment: PaypalPayment;

}
export class UpdateOrdertDto {
  @ApiProperty({
    description:
      'Se reciebe un estado de envío: "Pendiente de pago" | "Esperando retiro" | "En camino" | "Entregado" | "Cancelado"',
    example: 'En camino',
  })
  @IsString()
  @IsIn([
    statusOrder.AWAITING_PICKUP,
    statusOrder.SENDING,
    statusOrder.DELIVERED,
    statusOrder.CANCELLED,
  ])
  status: statusOrder;
}

export class QuoteOrderDto {
  @ApiProperty({
    description: 'Recibe el tamaño de paquete',
    example: { size: 'medium' },
  })
  @IsNotEmpty()
  packages: PackageDto;

  @ApiProperty({
    description: 'Recibe los datos de envío',
    example: {
      locality_origin: {
        id: 1,
      },
      locality_destination: {
        id: 4,
      },
    },
  })
  @IsNotEmpty()
  shipment: ShipmentDto;
}
