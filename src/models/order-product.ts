import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    modelName: "OrderProducts",
    timestamps: false,
})
export class OrderProduct extends Model<OrderProduct> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING(256),
        allowNull: false,
    })
    name: string;
    
    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    price: number;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    count: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    orderId: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    productId: string;
}