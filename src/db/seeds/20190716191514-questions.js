'use strict';

const faker = require("faker");

let questions = [];

 for(let i = 1 ; i <= 15 ; i++){
   questions.push({
     subject: faker.hacker.noun(),
     body: faker.hacker.phrase(),
     createdAt: new Date(),
     updatedAt: new Date(),
     categoryId: (i - 1);
   });
 }

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("Questions", questions, {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkInsert("Questions", null, {});
  }
};
