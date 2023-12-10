import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { Role } from './models/role';
import { User } from './models/user';
import { Product } from './models/product';
import { Order } from './models/order';
import { OrderProduct } from './models/order-product';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';

@Module({
  imports: [
    ConfigModule.forRoot(
      { isGlobal: true }
    ),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [
        Role,
        User,
        Product,
        Order,
        OrderProduct,
      ],
      synchronize: false,
    }),
    SequelizeModule.forFeature([
      Role,
      User,
      Product,
      Order,
      OrderProduct,
    ]),
  ],
  controllers: [ProductController, OrderController],
  providers: [ProductService, OrderService],
})
export class AppModule {}
