const { FarmAnimal } = require('../models');

const farmAnimalData = [
  {
    farm_id: 1,
    animal_id: 1
  },
  {
    farm_id: 1,
    animal_id: 2
  },
  {
    farm_id: 2,
    animal_id: 2
  },
  {
    farm_id: 2,
    animal_id: 3
  },
  {
    farm_id: 3,
    animal_id: 1
  },
  {
    farm_id: 3,
    animal_id: 3
  }
];

const seedFarmAnimals = () => FarmAnimal.bulkCreate(farmAnimalData);

module.exports = seedFarmAnimals;