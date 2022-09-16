const router = require('express').Router();
const model = require('connect-session-sequelize/lib/model');
const sequelize = require('../../config/connection');
const { Farm, User, Animal, Transaction} = require('../../models');


// get all users
router.get('/', (req, res) => {
  console.log('======================');
  Farm.findAll({
    attributes: [
      'id',
      'farm_name',
      'fund',
      'user_id'
    ],
    include: [
    {
        model: User,
        attributes: ['username']
    },
    {
        model: Animal,
        attributes:['id', 'animal_name', 'buy_price', 'sell_price']
        
    }
    ]
  })
    .then(dbFarmData => res.json(dbFarmData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Farm.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
        'id',
        'farm_name',
        'fund',
        'user_id'
    ],
    include: [
      {
          model: User,
          attributes: ['username']
      },
      {
        model: Animal,
        attributes:['id', 'animal_name', 'buy_price', 'sell_price', [sequelize.fn('SUM', sequelize.literal("CASE WHEN transaction_type = 'Sell' THEN (0-transaction_amount) ELSE transaction_amount END")), 'owned_animal_count']]
      }
      ]
  })
    .then(dbFarmData => {
      if (!dbFarmData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbFarmData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
   /* req.body should look like this...
    {
      farm_name: "Happy Valley",
      user_id: 4
    }
  */
  Farm.create({
    farm_name: req.body.farm_name,
    user_id: req.body.user_id
  })
    .then(dbFarmData => res.json(dbFarmData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  /* req.body should look like this...
    {
      transaction_id: 4,
      transaction_type: 'Sell',
      transacion_amount: -1,
      animal_id: 1,
      price: 10,
      fund: 5000
    }
  */
  Farm.update(
    {
      fund: req.body.fund +  req.body.price* req.body.transaction_amount
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbFarmData => {
      if (!dbFarmData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbFarmData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  console.log('id', req.params.id);
  Farm.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbFarmData => {
      if (!dbFarmData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbFarmData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;