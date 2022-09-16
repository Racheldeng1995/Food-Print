const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Farm, User, Animal, FarmAnimal, Transaction} = require('../../models');
const withAuth = require('../../utils/auth');

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
        attributes:['id', 'animal_name', [sequelize.literal('(SELECT COUNT(*) FROM farm_animal where animal.id = farm_animal.animal_id)'), 'owned_animal_count']],
        include:  {
            model: FarmAnimal,
            attributes:['id', 'farm_id', 'animal_id']
        }
    },
    {
        model: Transaction,
        attributes:['id', 'transaction_type', 'transaction_amount', 'farm_id', 'animal_id', [sequelize.literal('(SELECT SUM(transaction.animal) FROM transaction, animal where transaction.farm_id = farm.id and animal.id=transaction.animal_id)'), 'owned_animal_count']]
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
        model: Animal,
        attributes:['id', 'animal_name', [sequelize.literal('(SELECT COUNT(*) FROM farm_animal where animal.id = farm_animal.animal_id)'), 'owned_animal_count']],
        include:  {
            model: FarmAnimal,
            attributes:['id', 'farm_id', 'animal_id']
        }
    },
      {
        model: User,
        attributes: ['username']
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
  // expects {title: 'Taskmaster goes public!', content: 'it's important', user_id: 1}
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
  Farm.update(
    {
      farm_name: req.body.farm_name
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