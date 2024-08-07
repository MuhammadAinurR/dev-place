'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostCategory extends Model {
    static associate(models) {

    }
  }
  PostCategory.init({
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostCategory',
  });
  return PostCategory;
};