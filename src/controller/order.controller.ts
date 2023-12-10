import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderCreationDto } from '../dto/order.dto';
import { AuthGuard } from '../middleware/auth.guard';
import { Role, Roles } from '../decorator/role.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.Customer)
  @Post()
  async createOrder(@Body() orderDto: OrderCreationDto) {
    return this.orderService.createOrder(orderDto);
  }
}
