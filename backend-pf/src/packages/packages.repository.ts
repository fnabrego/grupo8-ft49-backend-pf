import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Package } from "./packages.entity";
import { Repository } from "typeorm";
import { PackageDto } from "./packages.dto";
import { PackageSize, PackageType } from "./packages.enum";

@Injectable()
export class PackagesRepository {
    constructor (
        @InjectRepository(Package)
        private packagesRepository: Repository<Package>
    ){}

    async getPackages(page: number, limit: number): Promise<Package[]> {
        if (page < 1 || limit < 1) {
            throw new BadRequestException('Page and limit must be greater than 0.');
        }

        const skip = (page -1) * limit;
        let packages = await this.packagesRepository.find({
            take: limit,
            skip: skip,
        });

        return packages;
    }

    async getPackage(id:string): Promise<Package> {
        const packagedb = await this.packagesRepository.findOneBy({id});
        if(!packagedb) {
            throw new NotFoundException(`Package with id ${id} not found`)
        }

        return packagedb;
    }

    //funcion ficticia para calcular el precio, debe ser actualizada con la logica real cuando sepamos bien como calcula el cliente el precio de cada paquete
    private calculatePrice(addpackage: Partial<Package>){
        let price = 0;

        switch(addpackage.size) {
            case PackageSize.SMALL:
                price = 10;
                break;         
            case PackageSize.MEDIUM:
                price = 20;
                break;
            case PackageSize.LARGE:
                price = 30;
                break;
            default:
                throw new BadRequestException('package size is not small, medium or large')
        }
        
        return price;
    }

    async addPackage(addpackage: Partial<Package>): Promise<Package>{
        const calculatedPrice = await this.calculatePrice(addpackage);

        addpackage.package_price = calculatedPrice;

        const newPackage = await this.packagesRepository.save(addpackage)
        return newPackage;
    }

    async updatePackage(id: string, updatepackage: Partial<PackageDto>) {
        const existingPackage = await this.packagesRepository.findOneBy({id})
        if (!existingPackage) {
            throw new NotFoundException(`Package with id ${id} not found`)
        }
        await this.packagesRepository.update(id, updatepackage);
        const updatedPackage = await this.packagesRepository.findOneBy({id});
        return updatedPackage;
    }

    async deletePackage(id:string): Promise<string> {
        const packagedb = await this.packagesRepository.findOneBy({id});
        if(!packagedb) {
            throw new NotFoundException(`Package with id ${id} not found`)
        }
        this.packagesRepository.remove(packagedb);
        return 'Package deleted'
    }
}