'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../utils/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'userId' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username has been registered'
      },
      validate: {
        notNull: {
          args: true,
          msg: 'Username should not empty'
        },
        notEmpty: {
          args: true,
          msg: 'Username should not empty'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email has been registered'
      },
      validate: {
        notNull: {
          args: true,
          msg: 'Email should not empty'
        },
        notEmpty: {
          args: true,
          msg: 'Email should not empty'
        },
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password should not empty'
        },
        notEmpty: {
          args: true,
          msg: 'Password should not empty'
        },
        len: {
          args: [5, 100],
          msg: 'Password length should more than 5'
        },
      }
    },
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};