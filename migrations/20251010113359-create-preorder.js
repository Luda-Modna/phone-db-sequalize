'use strict';

const { STATUS_PREORDER } = require('../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('preorders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      registration_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(...STATUS_PREORDER),
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      phone_customer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'phones',
          key: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint('preorders', {
      fields: ['registration_date'],
      type: 'check',
      where: Sequelize.literal('"registration_date" <= CURRENT_DATE'),
    });
    await queryInterface.addConstraint('preorders', {
      fields: ['amount'],
      type: 'check',
      where: {
        amount: {
          [Sequelize.Op.gte]: 0,
        },
      },
    });
    await queryInterface.addConstraint('preorders', {
      fields: ['phone_customer'],
      type: 'check',
      where: {
        phone_customer: {
          [Sequelize.Op.regexp]: '^\\+380[0-9]{9}$',
        },
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('preorders');
  },
};
