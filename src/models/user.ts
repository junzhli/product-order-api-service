import { Table, Column, Model, DataType, BelongsTo } from 'sequelize-typescript';
import { Role } from './role';

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING(256),
        unique: true,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    salt: string;

    @BelongsTo(() => Role, 'roleId')
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    role: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    roleId: string;
}