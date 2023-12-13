import { getModelToken } from '@nestjs/sequelize';
import { OrderController } from './order.controller';
import { OrderService } from '../service/order.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { OrderProduct } from '../models/order-product';
import {
  mockCustomorUserJwtContent,
  mockOrderCreationDto,
} from '../../test/mock';
import { Sequelize } from 'sequelize-typescript';

describe('orderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  const mockSequelizeOrders = {
    findAll: jest.fn(),
  };

  const mockSequelizeProducts = {
    findAll: jest.fn(),
  };

  const mockSequelizeOrderProducts = {
    findAll: jest.fn(),
  };

  const mockSequelize = {
    transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: getModelToken(Order), useValue: mockSequelizeOrders },
        { provide: getModelToken(Product), useValue: mockSequelizeProducts },
        {
          provide: getModelToken(OrderProduct),
          useValue: mockSequelizeOrderProducts,
        },
        { provide: Sequelize, useValue: mockSequelize },
      ],
    }).compile();
    orderService = module.get<OrderService>(OrderService);
    orderController = new OrderController(orderService);
  });

  describe('createOrder', () => {
    it('should return nothing when success', async () => {
      const result = undefined;
      jest.spyOn(orderService, 'createOrder').mockImplementation(() => result);

      expect(
        await orderController.createOrder(
          mockOrderCreationDto,
          mockCustomorUserJwtContent,
        ),
      ).toBe(result);
    });
  });
});
