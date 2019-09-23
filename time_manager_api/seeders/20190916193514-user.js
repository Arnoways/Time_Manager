'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Employees', [
        {
          first_name: "admin",
          last_name: "admin",
          email: "admin@admin.com",
          password: "$2b$10$ryITRehMr9/0hoBCL.dn/eP6F8Hq08D1ZQkUKV3Q3qePZCS.IjSF6",
          role: "Administrator",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Roles', null, {});
  }
};
