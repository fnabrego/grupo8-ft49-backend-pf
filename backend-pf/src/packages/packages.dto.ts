import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PackageSize } from './packages.enum';

export class PackageDto {
  /**
   * El tamaño del paquete, debe ser uno de los 3 tipos de paquetes válidos.

   * @example medium
   */
  @IsNotEmpty()
  @IsString()
  @IsIn([
    PackageSize.ENVELOP,
    PackageSize.SMALL,
    PackageSize.MEDIUM,
    PackageSize.LARGE,
  ])
  size: PackageSize;
}
