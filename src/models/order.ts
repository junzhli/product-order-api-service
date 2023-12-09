import { Table, Column, Model, DataType, HasMany, BelongsTo } from 'sequelize-typescript';
import { OrderProduct } from './orderProduct';
import { User } from './user';

@Table
export class Order extends Model<Order> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: string;

    @BelongsTo(() => User, 'userId')
    user: User;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: string;

    @HasMany(() => OrderProduct, 'orderId')
    products: OrderProduct[];
}