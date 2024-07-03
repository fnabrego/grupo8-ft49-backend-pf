import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PackagesService } from './packages.service';
import { PackageDto } from './packages.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PackagePricesDto } from './prices.dto';

@ApiTags('Packages')
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get()
  getPackages(@Query('page') page: string, @Query('limit') limit: string) {
    return this.packagesService.getPackages(Number(page), Number(limit));
  }

  // @Get('price/seeder')
  // preloadPrices() {
  //   return this.packagesService.preloadPrices();
  // }

  @Get(':id')
  getPackage(@Param('id', ParseUUIDPipe) id: string) {
    return this.packagesService.getPackage(id);
  }

  @Post()
  addPackage(@Body() addpackage: PackageDto) {
    return this.packagesService.addPackage(addpackage);
  }

  @Put('price')
  updatePrice(@Body() updatePrice: PackagePricesDto) {
    return this.packagesService.updatePrice(updatePrice);
  }

  @Put(':id')
  updatePackage(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatepackage: PackageDto,
  ) {
    return this.packagesService.updatePackage(id, updatepackage);
  }

  @Delete(':id')
  deletePackage(@Param('id', ParseUUIDPipe) id: string) {
    return this.packagesService.deletePackage(id);
  }
}
