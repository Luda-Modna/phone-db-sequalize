'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Phone.init(
    {
      model: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 50],
        },
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 50],
        },
      },
      productYear: {
        type: DataTypes.DATEONLY,
        validate: { isBefore: new Date().toISOString() },
      },
      sizeRAM: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 128,
          isInt: true,
        },
      },
      processor: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          len: [2, 50],
        },
      },
      screenDiagonal: {
        type: DataTypes.INTEGER,
        validate: {
          min: 3,
          max: 10,
        },
      },
      isNFC: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Phone',
      underscored: true,
    }
  );
  return Phone;
};
