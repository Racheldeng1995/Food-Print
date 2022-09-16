// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Transaction extends Model {}

// set up fields and rules for Product model
Transaction.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    transaction_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transaction_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    animal_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'animal',
        key: 'id'
      }
    },
    farm_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'farm',
          key: 'id'
        }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'transaction',
  }
);

module.exports = Transaction;
