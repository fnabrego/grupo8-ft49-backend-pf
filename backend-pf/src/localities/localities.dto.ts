import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LocalityDto {
  /**
   * Nombre de la localidad.
   * @example Rivadavia
   */
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  name: string;
}
