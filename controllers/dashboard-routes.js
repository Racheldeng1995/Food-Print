const router = require('express').Router();
const sequelize = require('../config/connection');
const { Farm, User, Animal, Transaction} = require('../models');
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
            attributes:['id','animal_name', 'buy_price', 'sell_price', [sequelize.literal("SUM(CASE WHEN transactions.transaction_type = 'Sell' THEN (0-transaction_amount) ELSE transaction_amount END)"), 'owned_animal_count']],
            
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
      
      //console.log(farm)
      //console.log(animals)
      //res.json(farm, user, animals)
      res.render('dashboard', { farm, user, animals, loggedIn: true})//user, animals, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

    
});

module.exports = router;
