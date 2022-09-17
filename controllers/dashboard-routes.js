const router = require('express').Router();
const sequelize = require('../config/connection');
const { Farm, User, Animal} = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Farm.findOne({
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
      const animal = dbFarmData
      res.render('dashboard', { animal, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
