'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'userId' });
      Post.belongsToMany(models.Category, { through: models.PostCategory })
    }
  }
  Post.init({
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    imgUrl: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};