'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    static associate (models) {
      Phone.hasMany(models.Preorder, {
        foreignKey: {
          name: 'phoneId',
          allowNull: false,
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });
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
        field: 'size_ram',
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
      isNFC: {
        type: DataTypes.BOOLEAN,
        field: 'is_nfs',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Phone',
      underscored: true,
    }
  );
  return Phone;
};
