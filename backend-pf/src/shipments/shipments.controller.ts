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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Shipments')
@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Get()
  async getShipments(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return await this.shipmentsService.getShipments(
      Number(page),
      Number(limit),
    );
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  @Post('add')
  async postShipments(@Body() data: ShipmentDto) {
    return await this.shipmentsService.postShipments(data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  async putShipments(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: ShipmentDto,
  ) {
    return await this.shipmentsService.putShipments(id, data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteShipments(@Param('id', ParseUUIDPipe) id: string) {
    return await this.shipmentsService.deleteShipments(id);
  }

  @Get('prices/seeder')
  async preloadShipmentPrices() {
    return await this.shipmentsService.preloadShipmentPrices();
  }
}
