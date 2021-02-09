'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        name: "Pork Schnitzel And Apple Salad",
        price: 150000,
        stock: 10,
        imageUrl: "https://spoonacular.com/recipeImages/656817-312x231.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Spinach Goats Cheese Roulade Main Dish",
        price: 100000,
        stock: 10,
        imageUrl: "https://spoonacular.com/recipeImages/1096208-312x231.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Lamb and Fresh Goat Cheese Roulade",
        price: 300000,
        stock: 10,
        imageUrl: "https://spoonacular.com/recipeImages/649183-312x231.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "German Meatloaf Falscher Hase",
        price: 250000,
        stock: 10,
        imageUrl: "https://spoonacular.com/recipeImages/644482-312x231.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Chicken/sweet Potato Roulade With Goat Cheese Sauce",
        price: 250000,
        stock: 10,
        imageUrl: "https://spoonacular.com/recipeImages/638493-312x231.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "German Braised Red Cabbage",
        price: 130000,
        stock: 10,
        imageUrl: "https://spoonacular.com/recipeImages/1095834-312x231.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Pork schnitzel with tarragon cream sauce",
        price: 60000,
        stock: 10,
        imageUrl: "https://spoonacular.com/recipeImages/656819-312x231.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Zucchini Feta Roulade",
        price: 100000,
        stock: 10,
        imageUrl: "https://spoonacular.com/recipeImages/1096205-312x231.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "German White Chocolate Cake",
        price: 90000,
        stock: 10,
        imageUrl: "https://spoonacular.com/recipeImages/644504-312x231.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "German Rhubarb Cake with Meringue",
        price: 90000,
        stock: 10,
        imageUrl: "https://spoonacular.com/recipeImages/644488-312x231.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
    await queryInterface.bulkDelete('Products', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
