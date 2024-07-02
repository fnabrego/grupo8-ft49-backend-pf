import { Injectable } from '@nestjs/common';
import { PackagesRepository } from './packages.repository';
import { PackageDto } from './packages.dto';
import { PackagePricesDto } from './prices.dto';

@Injectable()
export class PackagesService {
  constructor(private readonly packagesRepository: PackagesRepository) {}

  getPackages(page: number, limit: number) {
    return this.packagesRepository.getPackages(page, limit);
  }

  getPackage(id: string) {
    return this.packagesRepository.getPackage(id);
  }

  preloadPrices() {
    return this.packagesRepository.preloadPrices();
  }

  updatePrice(updatePackage: Partial<PackagePricesDto>) {
    return this.packagesRepository.updatePrice(updatePackage);
  }

  addPackage(addpackage: PackageDto) {
    return this.packagesRepository.addPackage(addpackage);
  }

  updatePackage(id: string, updatepackage: Partial<PackageDto>) {
    return this.updatePackage(id, updatepackage);
  }

  deletePackage(id: string) {
    return this.packagesRepository.deletePackage(id);
  }
}
