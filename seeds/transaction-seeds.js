const { Transaction } = require('../models');

const transactiondata = [
  {
    transaction_type: 'Sell',
    transaction_amount: 1,
    animal_id: 1,
    farm_id: 1
  },
  {
    transaction_type: 'Buy',
    transaction_amount: 1,
    animal_id: 2,
    farm_id: 2
  },
  {
    transaction_type: 'Buy',
    transaction_amount: 2,
    animal_id: 3,
    farm_id: 3
  }
];

const seedTransactions = () => Transaction.bulkCreate(transactiondata);

module.exports = seedTransactions;