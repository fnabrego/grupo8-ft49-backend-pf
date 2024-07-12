import { ApiProperty } from '@nestjs/swagger';

export class CreatePaypalOrderDto {
  @ApiProperty({
    description: 'El valor de la cantidad debe ser un número en formato string con dos decimales',
    example: '123.45',
    pattern: '^[0-9]+(\.[0-9]{1,2})?$',
  })
  amount: string;
}

export class CapturePaypalOrderDto {
    @ApiProperty({
        description: 'La id de la orden obtenida por el endpoint de crear orden',
        example: '4GK420656L552910R',
      })
      orderId: string;
}

