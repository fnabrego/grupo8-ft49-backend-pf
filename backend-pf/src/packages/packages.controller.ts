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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PackagesService } from './packages.service';
import { PackageDto } from './packages.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PackagePricesDto } from './prices.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Packages')
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los paquetes con paginado' })
  getPackages(@Query('page') page: string, @Query('limit') limit: string) {
    return this.packagesService.getPackages(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un paquete por id' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  getPackage(@Param('id', ParseUUIDPipe) id: string) {
    return this.packagesService.getPackage(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un paquete' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  addPackage(@Body() addpackage: PackageDto) {
    return this.packagesService.addPackage(addpackage);
  }

  @Put('price')
  @ApiOperation({ summary: 'Actualizar la lista de precios por tamaño de los paquetes' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updatePrice(@Body() updatePrice: PackagePricesDto) {
    return this.packagesService.updatePrice(updatePrice);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar la informacion de un paquete' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  updatePackage(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatepackage: PackageDto,
  ) {
    return this.packagesService.updatePackage(id, updatepackage);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un paquete' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deletePackage(@Param('id', ParseUUIDPipe) id: string) {
    return this.packagesService.deletePackage(id);
  }
}
