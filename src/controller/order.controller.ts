import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderCreationDto } from '../dto/order.dto';
import { AuthGuard } from '../middleware/auth.guard';
import { Role, Roles } from '../decorator/role.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../decorator/user.decorator';
import { IAuthJwtTokenContent } from '../interfaces/auth.interface';

@ApiBearerAuth()
@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.Customer)
  @Post()
  async createOrder(@Body() orderDto: OrderCreationDto, @User() user: IAuthJwtTokenContent) {
    return this.orderService.createOrder(orderDto, user);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Customer, Role.Manager)
  @Get()
  async listOrder(@User() user: IAuthJwtTokenContent) {
    return this.orderService.listOrder(user);
  }
}
