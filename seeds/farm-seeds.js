const { Farm } = require('../models');

const farmdata = [
  {
    farm_name: 'Honeybuzz',
    fund: 5010,
    user_id: 1
  },
  {
    farm_name: 'Rosy Dove Roost',
    fund: 4960,
    user_id: 2
  },
  {
    farm_name: 'Thirsty Cactus Ranch',
    fund: 4980,
    user_id: 3
  }
];

const seedFarms = () => Farm.bulkCreate(farmdata);

module.exports = seedFarms;