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
} from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentDto } from './shipments.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Shipments')
@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Get()
  async getLocalities(@Query('page') page: string, @Query('limit') limit: string) {
    return await this.shipmentsService.getShipments(
      Number(page), Number(limit)
    );
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
