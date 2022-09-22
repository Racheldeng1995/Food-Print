const router = require('express').Router();
const sequelize = require('../config/connection');
const { Farm, User, Animal,Transaction} = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Farm.findAll({
    where: {
        user_id: req.session.user_id
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
            model: Transaction,
            attributes:['transaction_type', 'transaction_amount','animal_id'],  
            include: [
              {
                model: Animal,
              attributes:['animal_name', 'buy_price', 'sell_price', [sequelize.literal("SUM(CASE WHEN transactions.transaction_type = 'Sell' THEN (0-transaction_amount) ELSE transaction_amount END)"), 'owned_animal_count']],
              
              }
            ],
          
        }
        ],
        group:sequelize.col('animal_name')
    
  })
    .then(dbFarmData => {
      if (!dbFarmData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      const farm = dbFarmData.map(farm => farm.get({ plain: true }))[0]
      const user = farm.user
      const animals = farm.transactions
      //const transactions = dbFarmData.dataValues.transactions
      const market = {
        farm: farm,
        user: user,
        animals:animals
        //transaction: transactions
      }
      return market
    })
    .then(dbMarketData => {
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
            .then(dbAnimalData => {
                const animalStock = dbAnimalData.map(animal => animal.get({ plain: true }))
                const farm = dbMarketData.farm
                const user = dbMarketData.user
                const animals = dbMarketData.animals
                //const transactions = dbMarketData.transactions
                //console.log(animalStock)
                //console.log(farm)
                //console.log(user)
                //console.log(animals)
                //console.log(transactions)
                res.render('market', { farm, user, animals, loggedIn: true, animalStock });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;


