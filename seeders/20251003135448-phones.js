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
          product_year: '2016-08-21',
          size_ram: 8,
          processor: 'Snapdragon',
          screen_diagonal: 6,
          is_nfs: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          model: 'iPhone 14',
          brand: 'Apple',
          product_year: '2022-09-16',
          size_ram: 8,
          processor: 'IPhone',
          screen_diagonal: 6,
          is_nfs: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          model: 'Galaxy S23',
          brand: 'Samsung',
          product_year: '2023-02-01',
          size_ram: 12,
          processor: 'Snapdragon',
          screen_diagonal: 6,
          is_nfs: true,
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
