import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Packages } from "./packages.entity";
import { Repository } from "typeorm";
import { PackageDto } from "./packages.dto";

@Injectable()
export class PackagesRepository {
    constructor (
        @InjectRepository(Packages)
        private packagesRepository: Repository<Packages>
    ){}

    async getPackages(page: number, limit: number): Promise<Packages[]> {
        if (page < 1 || limit < 1) {
            throw new Error('Page and limit must be greater than 0.');
        }

        const skip = (page -1) * limit;
        let packages = await this.packagesRepository.find({
            take: limit,
            skip: skip,
        });

        return packages;
    }

    async getPackage(id:string): Promise<Packages> {
        const packagedb = await this.packagesRepository.findOneBy({id});
        if(!packagedb) {
            throw new NotFoundException(`Package with id ${id} not found`)
        }

        return packagedb;
    }

    //funcion ficticia para calcular el precio, debe ser actualizada con la logica real cuando sepamos bien como calcula el cliente el precio de cada paquete
    private calculatePrice(addpackage: Partial<Packages>){
        const weigth = addpackage.weigth;
        const price = weigth * 10;
        return price;
    }

    async addPackage(addpackage: Partial<Packages>): Promise<Packages>{
        const calculatedPrice = await this.calculatePrice(addpackage);

        addpackage.package_price = calculatedPrice;

        const newPackage = await this.packagesRepository.save(addpackage)
        return newPackage;
    }

    async updatePackage(id: string, updatepackage: Partial<PackageDto>) {
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