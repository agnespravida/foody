'use strict';
let bcrypt = require("bcryptjs")
let salt = bcrypt.genSaltSync(10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: "agnes@mail.com",
        password: bcrypt.hashSync("qweqwe", salt),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: "pravida@mail.com",
        password: bcrypt.hashSync("qweqwe", salt),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: "irlitashanty@mail.com",
        password: bcrypt.hashSync("qweqwe", salt),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
