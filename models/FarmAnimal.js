const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class FarmAnimal extends Model {}

FarmAnimal.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    farm_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'farm',
        key: 'id'
      }
    },
    animal_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'animal',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'farm_animal',
  }
);

module.exports = FarmAnimal;