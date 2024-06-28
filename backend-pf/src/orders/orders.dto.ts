import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { PackageDto } from '../packages/packages.dto';
import { ShipmentDto } from '../shipments/shipments.dto';

export class CreateOrderDto {

    // @ApiProperty({
    //     description: 'Debe ser un string de máximo 50 caracteres, correspondiente al uuid de un usuario existente',
    //     example: [
    //         { id: 'dbec309b-7caa-40ee-950f-65d0a9d8dee8' },
    //         { id: '5b296c32-181b-4c62-bcdf-c8490529ab87' }
    //     ]
    // })
    // @IsNotEmpty()
    // @IsUUID()
    // userId: string;


    @IsNotEmpty()
    packages: PackageDto;
    
    
    @IsNotEmpty()
    shipment: ShipmentDto;

}