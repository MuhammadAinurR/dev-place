'use strict';
module.exports = {
  async up(queryInterface) {
    const data = require('../data/posts.json')
    await queryInterface.bulkInsert('Posts', data);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
