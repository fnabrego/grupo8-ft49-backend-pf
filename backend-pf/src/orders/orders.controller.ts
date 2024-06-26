import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { Order } from './orders.entity';
import { CreateOrderDto } from './orders.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get(':id')
    getOrder(@Param('id', ParseUUIDPipe) id: string) {
        return this.ordersService.getOrder(id)
    }

    @Get()
    @ApiQuery({ name: 'page', required: false, type: String })
    @ApiQuery({ name: 'limit', required: false, type: String })
    getOrders(@Param('page') page?: string, @Param('limit') limit?: string) {
        if (!page || !limit) return this.ordersService.getOrders();
        const pageInt = Number(page);
        const limitInt = Number(limit);
        return this.ordersService.getOrders(pageInt, limitInt);
    }

    @Post()
    addOrder(@Body() order: CreateOrderDto) {
        return this.ordersService.addOrder(order);
    }

    @Put()
    updateOrder(@Param('id', ParseUUIDPipe) id: string, @Body() order: Partial<Order>) {
        return this.ordersService.updateOrder(id, order);
    }

    @Delete()
    deleteOrder(@Param('id', ParseUUIDPipe) id: string) {
        return this.ordersService.deleteOrder(id);
    }

}
