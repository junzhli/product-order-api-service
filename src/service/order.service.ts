import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderCreationDto } from '../dto/order.dto';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { Op, Transaction } from 'sequelize';
import { Sequelize } from "sequelize-typescript";
import * as lodash from 'lodash';
import { OrderProduct } from '../models/order-product';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order)
        private orderModel: typeof Order, 
        @InjectModel(Product)
        private productModel: typeof Product,
        @InjectModel(OrderProduct)
        private orderProductModel: typeof OrderProduct,
        private sequelize: Sequelize,
    ) {}

    private readonly logger = new Logger(OrderService.name);

  public async createOrder(orderDto: OrderCreationDto): Promise<void> {
    const {userId} = orderDto;

    const orderProductIds = lodash.uniq(orderDto.orderProducts.map(orderProduct => orderProduct.id));

    if (orderProductIds.length !== orderDto.orderProducts.length) {
        throw new Error("Items in order products contain duplicates")
    }

    const transaction = await this.sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
    });

    try {
        const products = await this.productModel.findAll({
            where: {
                id: {
                    [Op.in]: orderProductIds
                },
            },
            lock: transaction.LOCK.UPDATE,
            transaction,
        });

        if (products.length !== orderDto.orderProducts.length) {
            throw new Error("Some products in order product list don't exist")
        }

        const orderProducts: {
            ref: Product;
            count: number;
        }[] = [];
        for (const orderProduct of orderDto.orderProducts) {
            const p = products.find(product => {
                return product.id.toString() === orderProduct.id.toString()
            });
            if (p.stock < orderProduct.count) {
                throw new Error(`Product is out of stock ${p.id}`);
            }

            orderProducts.push({
                ref: p,
                count: orderProduct.count,
            });
        };

        const {id: orderId} = await this.orderModel.create({
            userId,
        }, {
            transaction,
        });

        await this.orderProductModel.bulkCreate(orderProducts.map(_orderProduct => {
            const { ref, count } = _orderProduct;
            return {
                orderId,
                productId: ref.id,
                name: ref.name,
                price: ref.price,
                count,
            };
        }), {
            transaction,
        });

        await Promise.all(orderProducts.map(async orderProduct => {
            const {ref, count} = orderProduct;
            await ref.decrement({
                stock: count,
            }, {
                transaction,
            });
        }));

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
  }
}