'use strict';
module.exports = {
  async up(queryInterface) {
    const data = require('../data/postsCategories.json')
    await queryInterface.bulkInsert('PostCategories', data);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('PostCategories', null, {});
  }
};
