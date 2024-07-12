import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class ReviewDto {
  @ApiProperty({
    description: 'Puntaje brindado por el usuario (1-5 int)',
    example: '5',
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number;

  @ApiProperty({
    description: 'Comentario del usuario',
    example: 'El paquete llegó perfectamente.',
  })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  comment: string;
}
