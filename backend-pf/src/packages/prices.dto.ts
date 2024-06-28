import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class PackagePricesDto {
    /**
     * @description Precio de un sobre
     * @example 500
     */
    @IsNotEmpty()
    @IsNumber()
    @Type(()=> Number)
    @Min(1, { message: 'Price must be greater than 0' })
    ENVELOP: 500
    
    /**
     * @description Precio de un paquete small
     * @example 1000
     */
    @IsNotEmpty()
    @IsNumber()
    @Type(()=> Number)
    @Min(1, { message: 'Price must be greater than 0' })
    SMALL: 1000

    /**
     * @description Precio de un paquete medium
     * @example 2000
     */
    @IsNotEmpty()
    @IsNumber()
    @Type(()=> Number)
    @Min(1, { message: 'Price must be greater than 0' })
    MEDIUM: 2000

    /**
     * @description Precio de un paquete large
     * @example 3000
     */
    @IsNotEmpty()
    @IsNumber()
    @Type(()=> Number)
    @Min(1, { message: 'Price must be greater than 0' })
    LARGE: 3000
}