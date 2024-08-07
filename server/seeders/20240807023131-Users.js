'use strict';
const { hashPassword } = require('../utils/bcrypt');
module.exports = {
  async up(queryInterface) {
    const data = require('../data/users.json').map(e => {
      const { password } = e
      return {
        ...e,
        password: hashPassword(password),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('Users', data);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
