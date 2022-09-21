const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Farm, Animal, Transaction, User} = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
  console.log('======================');
  Transaction.findAll({
    attributes: [
      'id',
      'transaction_type',
      'transaction_amount',
      'animal_id',
      'farm_id'
    ],
    include: [
    {
        model: Animal,
        attributes:['id', 'animal_name']
    },
    {
        model: Farm,
        attributes: ['id', 'farm_name', 'fund', 'user_id'],
        include: [
          {
            model: User,
            attributes:['id', 'username']
          }
        ]
    }
    ]
  })
    .then(dbTransactionData => res.json(dbTransactionData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Transaction.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'transaction_type',
      'transaction_amount',
      'animal_id',
      'farm_id'
    ],
    include: [
    {
        model: Animal,
        attributes:['id', 'animal_name']
    },
    {
        model: Farm,
        attributes: ['id', 'farm_name', 'fund', 'user_id'],
        include: [
          {
            model: User,
            attributes:['id', 'username']
          }
        ]
    }
    ]
  })
    .then(dbTransactionData => {
      if (!dbTransactionData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbTransactionData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth,  (req, res) => {
  /* req.body should look like this...
    {
      transaction_type: "Buy",
      transaction_amount: 1,
      animal_id: 3,
      farm_id: 1,
      buy_price: 10
    }
  */
  Transaction.create({
    transaction_type: req.body.transaction_type,
    transaction_amount: req.body.transaction_amount,
    animal_id: req.body.animal_id,
    farm_id: req.body.farm_id
  })
  .then(dbTransactionData => {
    if (!dbTransactionData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbTransactionData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});




module.exports = router;