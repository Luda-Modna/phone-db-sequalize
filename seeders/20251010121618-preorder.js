'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'preorders',
      [
        {
          registration_date: '2025-10-08',
          status: 'pending',
          amount: 2,
          phone_customer: '+380123456789',
          phone_id: 8,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          registration_date: '2025-09-29',
          status: 'confirmed',
          amount: 1,
          phone_customer: '+380123456788',
          phone_id: 9,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          registration_date: '2025-10-01',
          status: 'done',
          amount: 2,
          phone_customer: '+380123456787',
          phone_id: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('preorders', null, {});
  },
};
