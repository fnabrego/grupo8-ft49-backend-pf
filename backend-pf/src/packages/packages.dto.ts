import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PackageSize } from './packages.enum';

export class PackageDto {
  /**
   * Package size, must be one of the 3 valid types of packages
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
