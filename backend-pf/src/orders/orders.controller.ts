import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto, QuoteOrderDto, UpdateOrdertDto } from './orders.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una orden por id' })
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrder(id);
  }

  @HttpCode(200)
  @Get()
  @ApiOperation({ summary: 'Obtener todas las ordenes con paginado' })
  @Roles(Role.Admin, Role.Transporte)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getOrders(@Query('page') page?: number, @Query('limit') limit?: number) {
    if (!page || !limit) return this.ordersService.getOrders();

    return this.ordersService.getOrders(page, limit);
  }

  @HttpCode(200)
  @Post('quoter')
  @ApiOperation({ summary: 'Cotizar un envio' })
  quoteOrder(@Body() order: QuoteOrderDto) {
    const { packages, shipment } = order;
    return this.ordersService.quoteOrder(packages, shipment);
  }

  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Post('/new/:id')
  @ApiOperation({ summary: 'Crear una orden de envio' })
  addOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() order: CreateOrderDto,
  ) {
    const { packages, shipment } = order;
    return this.ordersService.addOrder(id, packages, shipment);
  }

  @HttpCode(200)
  @Roles(Role.Admin, Role.Transporte)
  @UseGuards(AuthGuard, RolesGuard)
  @Put('/update/:id')
  @ApiOperation({ summary: 'Actualizar la informacion de una Orden' })
  updateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() order: UpdateOrdertDto,
  ) {
    return this.ordersService.updateOrder(id, order);
  }

  @HttpCode(200)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Eliminar una Orden' })
  deleteOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.deleteOrder(id);
  }
}
