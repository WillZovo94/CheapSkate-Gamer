const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Reviews extends Model {}

Reviews.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
      },    
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    games_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'games',
        key: 'id',
      },  
    },
  },
  {
    sequelize,
    timestamps: true, // use the createdAt key for the timestamp
    freezeTableName: true,
    underscored: true,
    modelName: 'reviews',
  }
);

module.exports = Reviews;