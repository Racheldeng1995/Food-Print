const { Animal } = require('../models');

const animaldata = [
  {
    animal_name: 'Sheep',
    sell_price: 10,
    buy_price: 20
  },
  {
    animal_name: 'Cattle',
    sell_price: 20,
    buy_price: 40
  },
  {
    animal_name: 'Chicken',
    sell_price: 5,
    buy_price: 10
  }
];

const seedAnimals = () => Animal.bulkCreate(animaldata);

module.exports = seedAnimals;