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
import { ShipmentsService } from './shipments.service';
import { ShipmentDto } from './shipments.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Shipment } from './shipments.entity';

@ApiTags('Shipments')
@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los envios con paginado' })
  async getShipments(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return await this.shipmentsService.getShipments(
      Number(page),
      Number(limit),
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('add')
  @ApiOperation({ summary: 'Crear un envio' })
  async postShipments(@Body() data: ShipmentDto): Promise<Shipment> {
    return await this.shipmentsService.postShipments(data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar la informacion de un envio' })
  async putShipments(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: ShipmentDto,
  ) {
    return await this.shipmentsService.putShipments(id, data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un envio' })
  async deleteShipments(@Param('id', ParseUUIDPipe) id: string) {
    return await this.shipmentsService.deleteShipments(id);
  }
}
