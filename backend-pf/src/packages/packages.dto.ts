import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class PackageDto {
    /**
     * Package type, can be a box, an envelop, or a bag
     */
    @IsNotEmpty()
    @IsString()
    type: string

    /**
     * Package width
     */
    @IsNotEmpty()
    @IsNumber()
    @Type(()=> Number)
    width: number

    /**
     * Package length
     */
    @IsNotEmpty()
    @IsNumber()
    @Type(()=> Number)
    length: number

    /**
     * Package heigth
     */
    @IsNotEmpty()
    @IsNumber()
    @Type(()=> Number)
    heigth: number

    /**
     * Package weigth
     */
    @IsNotEmpty()
    @IsNumber()
    @Type(()=> Number)
    weigth: number

}