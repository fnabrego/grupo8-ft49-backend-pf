import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { PackageDto } from '../packages/packages.dto';
import { ShipmentDto } from '../shipments/shipments.dto';
import { statusOrder } from './statusOrder.enum';

export class CreateOrderDto {

    @ApiProperty({
        description: 'Recibe el tamaño de paquete',
        example: { "size": "medium" },
    })
    @IsNotEmpty()
    packages: PackageDto;

    @ApiProperty({
        description: 'Recibe los datos de envío',
        example: {
            "locality_origin": {
                "id": 1
            },
            "locality_destination": {
                "id": 4
            },
            "address_origin": "string",
            "address_destination": "string",
        }
    })
    @IsNotEmpty()
    shipment: ShipmentDto;

}
export class UpdateOrdertDto {

    @ApiProperty({
        description: 'Se reciebe un estado de envío: receipted|acepted|sending|delivered|cancelled',
        example: 'acepted',
    })
    @IsString()
    @IsIn([
        statusOrder.RECEIPTED,
        statusOrder.ACEPTED,
        statusOrder.SENDING,
        statusOrder.DELIVERED,
        statusOrder.CANCELLED
    ])
    status: statusOrder;
}