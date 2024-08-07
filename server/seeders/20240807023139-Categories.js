'use strict';
module.exports = {
  async up(queryInterface) {
    const data = require('../data/categories.json').map(e => {
      return {
        ...e,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('Categories', data);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
