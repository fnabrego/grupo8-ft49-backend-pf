import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentDto } from './shipments.dto';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Get()
  async getLocalities() {
    return await this.shipmentsService.getShipments();
  }

  @Post('add')
  async postLocalities(@Body() data: ShipmentDto) {
    return await this.shipmentsService.postShipments(data);
  }

  @Put(':id')
  async putLocalities(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: ShipmentDto,
  ) {
    return await this.shipmentsService.putShipments(id, data);
  }

  @Delete(':id')
  async deleteLocalities(@Param('id', ParseUUIDPipe) id: string) {
    return await this.shipmentsService.deleteShipments(id);
  }
}
