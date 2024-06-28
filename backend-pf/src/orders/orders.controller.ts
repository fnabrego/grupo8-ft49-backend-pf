import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { Order } from './orders.entity';
import { CreateOrderDto } from './orders.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateUserDto } from '../users/users.dto';
import { PackageDto } from '../packages/packages.dto';
import { ShipmentDto } from '../shipments/shipments.dto';

@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrder(id);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiQuery({ name: 'page', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: String })
  getOrders(@Param('page') page?: string, @Param('limit') limit?: string) {
    if (!page || !limit) return this.ordersService.getOrders();
    const pageInt = Number(page);
    const limitInt = Number(limit);
    return this.ordersService.getOrders(pageInt, limitInt);
  }

  @UseGuards(AuthGuard)
  @Post('/new/:id')
  addOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() order: CreateOrderDto
  ) {
    const { packages, shipment } = order;
    return this.ordersService.addOrder(id, packages, shipment);
  }

  @Roles(Role.Admin, Role.Transporte)
  @UseGuards(AuthGuard, RolesGuard)
  @Put('/update/:id')
  updateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() order: Partial<Order>,
  ) {
    return this.ordersService.updateOrder(id, order);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete()
  deleteOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.deleteOrder(id);
  }
}
