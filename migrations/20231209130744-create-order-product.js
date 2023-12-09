'use strict';
var DataType = require('sequelize/lib/data-types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('OrderProducts', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: DataType.STRING(256),
        allowNull: false,
      },
      price: {
        type: DataType.FLOAT,
        allowNull: false,
      },
      count: {
        type: DataType.BIGINT,
        allowNull: false,
      },
      orderId: {
        type: DataType.INTEGER,
        allowNull: false,
        references: { model: 'Orders', key: 'id' },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      productId: {
        type: DataType.INTEGER,
        allowNull: false,
        references: { model: 'Products', key: 'id' },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('OrderProducts');
  }
};
