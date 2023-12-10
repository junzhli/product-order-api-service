import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderCreationDto } from '../dto/order.dto';

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderDto: OrderCreationDto) {
    return this.orderService.createOrder(orderDto);
  }
}
