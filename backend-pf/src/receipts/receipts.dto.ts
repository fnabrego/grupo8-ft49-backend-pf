import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator"

export class ReceiptDto {
    /**
     * @description Nombre del usuario que pago el envio
     * @example 'Pedro'
     */
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    name: string;
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    lastName: string;

    @IsString()
    @MaxLength(50)
    companyName: string;

    @IsString()
    dni: string;

    @IsString()
    cuit_cuil: string;

    @IsNotEmpty()
    @IsUUID()
    orderId: string;

}