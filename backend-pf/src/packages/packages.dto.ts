import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { PackageSize, PackageType } from "./packages.enum";

export class PackageDto {
    /**
     * Package type, must be one of the 5 valid types of packages
     * @example ENVELOPE
     */
    @IsNotEmpty()
    @IsString()
    @IsIn([
        PackageType.ENVELOPE,
        PackageType.PACKAGE,
        PackageType.PALLET,
        PackageType.WINE_BOX,
        PackageType.OTHER,
    ])
    type: PackageType;

    /**
     * Package size, must be one of the 3 valid types of packages
     * @example MEDIUM
     */
    @IsNotEmpty()
    @IsString()
    @IsIn([
        PackageSize.SMALL,
        PackageSize.MEDIUM,
        PackageSize.LARGE,
    ])
    size: PackageSize;

}