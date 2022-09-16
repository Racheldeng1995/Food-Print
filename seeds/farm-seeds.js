const { Farm } = require('../models');

const farmdata = [
  {
    farm_name: 'Honeybuzz',
    user_id: 1
  },
  {
    farm_name: 'Rosy Dove Roost',
    user_id: 2
  },
  {
    farm_name: 'Thirsty Cactus Ranch',
    user_id: 3
  }
];

const seedFarms = () => Farm.bulkCreate(farmdata);

module.exports = seedFarms;