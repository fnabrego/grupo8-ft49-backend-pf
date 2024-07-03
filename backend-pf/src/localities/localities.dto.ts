import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LocalityDto {
  /**
   * Nombre de la localidad.
   * @example 'La Libertad'
   */
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  name: string;
}
