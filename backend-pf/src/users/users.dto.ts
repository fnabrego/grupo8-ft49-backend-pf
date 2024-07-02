import { ApiHideProperty, ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { Role } from 'src/roles/roles.enum';
import { MatchPassword } from '../decorators/matchPassword.decorator';

export class CreateUserDto {
  @ApiHideProperty()
  id: string;

  @ApiProperty({
    description: 'Direccion Email',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email: string;

  @ApiProperty({
    description: 'Nombre del usuario a registrarse',
    example: 'Pedro',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;

  @ApiProperty({
    description: 'Apellido del usuario a registrarse',
    example: 'Gomez',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  lastName: string;

  @ApiProperty({
    description: 'Nombre de la empresa a la que representa el usuario',
    example: '',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  companyName: string;

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
  password: string;

  @ApiProperty({
    description: 'Confirmacion de contraseña',
    example: 'P@ssw0rd1234!',
  })
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  @ApiProperty({
    description: 'DNI',
    example: '',
  })
  @IsOptional()
  @IsString()
  dni: string;

  @ApiProperty({
    description: 'CUIT/CUIL para responsables inscriptos',
    example: '',
  })
  @IsOptional()
  @IsString()
  cuit_cuil: string;

  @ApiProperty({
    description: 'Dirección',
    example: '123 Main St',
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  address: string;

  @ApiProperty({
    description: 'Localidad',
    example: 'Springfield',
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  locality: string;

  @ApiHideProperty()
  @IsString()
  @IsOptional()
  profilePicture: string;

  @ApiHideProperty()
  @IsEmpty()
  @IsEnum(Role)
  role: Role;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
