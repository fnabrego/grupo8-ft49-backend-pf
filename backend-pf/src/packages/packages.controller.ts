import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PackagesService } from './packages.service';
import { PackageDto } from './packages.dto';

@ApiTags('Packages')
@Controller('packages')
export class PackagesController {
    constructor (
        private readonly packagesService: PackagesService,
    ) {}

    @Get()
    getPackages(
        @Query('page') page: string, @Query('limit') limit: string
    ){
        return this.packagesService.getPackages(
            Number(page), Number(limit)
        );
    }

    @Get(':id')
    getPackage(@Param('id', ParseUUIDPipe) id:string){
        return this.packagesService.getPackage(id);
    }

    @Post()
    addPackage(@Body() addpackage: PackageDto){
        return this.packagesService.addPackage(addpackage);
    }

    @Put(':id')
    updatePackage(@Param('id', ParseUUIDPipe) id:string, @Body() updatepackage: Partial<PackageDto>){
        return this.packagesService.updatePackage(id, updatepackage);
    }

    @Delete(':id')
    deletePackage(@Param('id', ParseUUIDPipe) id: string){
        return this.packagesService.deletePackage(id);
    }
}
