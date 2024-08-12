const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model {}

Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    reviews_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'reviews',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true, // use the createdAt key for the timestamp
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
  }
);

module.exports = Comments;