'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Roles', [
      {
        id: 1,
        label: 'Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        label: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        label: 'Employee',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
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
