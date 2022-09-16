const router = require('express').Router();
const { Farm, User, Animal, Transaction} = require('../../models');

// get all users
router.get('/', (req, res) => {
  console.log('======================');
  Animal.findAll({
    attributes: [
      'id',
      'animal_name',
      'buy_price',
      'sell_price'
    ],
    include: [
    {
        model: Farm,
        attributes:['id', 'farm_name', 'fund', 'user_id'],
        include: [
            {
                model:User,
                attributes: ['id', 'username']
            }
        ]
    }
    ]
  })
    .then(dbAnimalData => res.json(dbAnimalData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;