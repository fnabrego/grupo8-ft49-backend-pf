import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  // ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LocalitiesService } from './localities.service';
import { LocalityDto } from './localities.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Localities')
@Controller('localities')
export class LocalitiesController {
  constructor(private readonly localitiesService: LocalitiesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las localidades' })
  async getLocalities(): Promise<LocalityDto[]> {
    return await this.localitiesService.getLocalities();
  }
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('add')
  @ApiOperation({ summary: 'Añadir una localidad a la base de datos' })
  async postLocalities(@Body() data: LocalityDto) {
    return await this.localitiesService.postLocalities(data);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar la informacion de una localidad' })
  async putLocalities(@Param('id') id: number, @Body() data: LocalityDto) {
    return await this.localitiesService.putLocalities(id, data);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una localidad de la base de datos' })
  async deleteLocalities(@Param('id') id: number) {
    return await this.localitiesService.deleteLocalities(id);
  }

  // @Get('seeder')
  // async preloadLocalities() {
  //   return await this.localitiesService.preloadLocalities();
  // }
}
