'use strict';
const { isFuture } = require('date-fns');
const { Model } = require('sequelize');
const { STATUS_PREORDER } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  class Preorder extends Model {
    static associate (models) {
      Preorder.belongsTo(models.Phone, {
        foreignKey: 'phoneId',
      });
    }
  }
  Preorder.init(
    {
      registrationDate: {
        type: DataTypes.DATEONLY,
        validate: {
          notInFuture (value) {
            if (isFuture(new Date(value))) {
              throw new Error('Дата реєстрації не може бути у майбутньому');
            }
          },
        },
      },
      status: {
        type: DataTypes.STRING(10),
        validate: {
          isIn: [STATUS_PREORDER],
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        validate: { min: 0 },
      },
      phoneCustomer: {
        type: DataTypes.STRING,
        validate: {
          is: /^\+380\d{9}$/,
        },
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: 'Preorder',
    }
  );
  return Preorder;
};
