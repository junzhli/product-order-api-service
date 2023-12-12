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
import { UserAuthController } from './controller/user-auth.controller';
import { UserService } from './service/user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filter/all-exceptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Role, User, Product, Order, OrderProduct],
      synchronize: false,
    }),
    SequelizeModule.forFeature([Role, User, Product, Order, OrderProduct]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_TOKEN_SECRET_KEY,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [ProductController, OrderController, UserAuthController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    ProductService,
    OrderService,
    UserService,
    AuthService,
  ],
})
export class AppModule {}
