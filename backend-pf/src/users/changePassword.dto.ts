import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class changePassword {
  @ApiProperty({
    description: 'Contraseña',
    example: 'P@ssw0rd1234!',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'La contraseña debe tener una letra mayuscula, una letra minuscula, un numero y un caracter especial: !@#$%^&* ',
  })
  @MinLength(8)
  @MaxLength(15)
  oldPassword: string;

  @ApiProperty({
    description: 'Nueva de contraseña',
    example: 'Nuev@Contra22!',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'La contraseña debe tener una letra mayuscula, una letra minuscula, un numero y un caracter especial: !@#$%^&* ',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  newPassword: string;
}
