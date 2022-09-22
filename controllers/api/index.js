const router = require('express').Router();
const userRoutes = require('./user-routes');
const farmRoutes = require('./farm-routes');
const animalRoutes = require('./animal-routes');
const transactionRoutes = require('./transaction-routes');

router.use('/users', userRoutes);
router.use('/farms', farmRoutes);
router.use('/animals', animalRoutes);
router.use('/transactions', transactionRoutes);

module.exports = router;
