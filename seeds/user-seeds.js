const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [
  {
    username: 'racheldeng',
    email: 'rachel@gmail.com',
    password: 'password123'
  },
  {
    username: 'jane',
    email: 'jane@gmail.com',
    password: 'password123'
  },
  {
    username: 'mert',
    email: 'mert@gmail.com',
    password: 'password123'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;