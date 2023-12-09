import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from './user';

@Table({
    modelName: "Products",
})
export class Product extends Model<Product> {
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
    price: string;

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    stock: string;

    @BelongsTo(() => User, { as: "User_Id"})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    user: User;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: string;
}