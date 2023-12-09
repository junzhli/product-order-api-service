import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Role extends Model<Role> {
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
    role: string;
}