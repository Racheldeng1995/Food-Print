const router = require('express').Router();
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
      'user_id',
      'created_at'
    ],
    include: [
    {
        model: User,
        attributes: ['username']
    },
    {
        model: Animal,
        attributes:['id', 'animal_name', 'buy_price', 'sell_price' [sequelize.literal('(SELECT COUNT(*) FROM transaction where animal.id = transaction.animal_id)'), 'owned_animal_count']],
        include:[
          {
            model: Transaction,
            attributes:['id', 'transaction_type', 'transaction_amount', 'farm_id', 'animal_id']
          }
        ]
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
        'user_id',
        'created_at'
    ],
    include: [
      {
          model: User,
          attributes: ['username']
      },
      {
          model: Animal,
          attributes:['id', 'animal_name', 'buy_price', 'sell_price',sequelize.literal(`
          SELECT 
            CASE WHEN (sell_amount+buy_amount)<=0 THEN 0 ELSE (sell_amount+buy_amount) END FROM
          (
          SELECT transaction.animal_id, (0-SUM(transaction_amount)) as amount FROM transaction where animal.id = transaction.animal_id and transaction_type = 'Sell'
          UNION
          SELECT transaction.animal_id,SUM(transaction_amount) as amount FROM transaction where animal.id = transaction.animal_id and transaction_type = 'Buy')
          `), 'owned_animal_count'],
          include:[
            {
              model: Transaction,
              attributes:['id', 'transaction_type', 'transaction_amount', 'farm_id', 'animal_id']
            }
          ]
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
      transacion_amount: 1,
      animal_id: 1,
      price: -10,
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