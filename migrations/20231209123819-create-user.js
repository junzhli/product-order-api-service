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
    await queryInterface.createTable('Users', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: DataType.STRING(256),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
      },
      salt: {
        type: DataType.STRING,
        allowNull: false,
      },
      roleId: {
        type: DataType.INTEGER,
        allowNull: false,
        references: { model: 'Roles', key: 'id' }
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
    await queryInterface.dropTable('Users');
  }
};
