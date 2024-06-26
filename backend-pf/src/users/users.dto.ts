import { PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/roles/roles.enum';

export class CreateUserDto {
  id: string;
  /**
   * @description Direccion Email
   * @example 'user@example.com'
   */
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email: string;

  /**
   * @description Contraseña
   * @example 'P@ssw0rd1234!'
   */
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'La contraseña debe tener una letra mayuscula, una letra minuscula, un numero y un caracter especial: !@#$%^&* ',
  })
  @MinLength(8)
  @MaxLength(15)
  password: string;

  /**
   * @description DNI
   * @example 34567876
   */
  @IsInt()
  dni: number;

  /**
   * @description CUIT/CUIL para responsables inscriptos
   * @example 23764539873
   */
  @IsInt()
  cuit_cuil: number;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  address: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  locality: string;

  @IsEnum(Role)
  role: Role;
}
export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
