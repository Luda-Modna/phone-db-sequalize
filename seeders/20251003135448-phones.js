'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'phones',
      [
        {
          model: 'Galaxy Note 20',
          brand: 'Samsung',
          productYear: '2016-08-21',
          sizeRAM: 8,
          processor: 'Snapdragon',
          screenDiagonal: 6,
          isNFC: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          model: 'iPhone 14',
          brand: 'Apple',
          productYear: '2022-09-16',
          sizeRAM: 8,
          processor: 'IPhone',
          screenDiagonal: 6,
          isNFC: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          model: 'Galaxy S23',
          brand: 'Samsung',
          productYear: '2023-02-01',
          sizeRAM: 12,
          processor: 'Snapdragon',
          screenDiagonal: 6,
          isNFC: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('phones', null, {});
  },
};
