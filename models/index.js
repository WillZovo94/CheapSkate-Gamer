const User = require('./User');
const Games = require('./Games');
const Reviews = require('./Reviews');
const Comments = require('./Comments');

// Creates a relationship between User and Games model, with a "has many" relationship of the User to the Games.
User.hasMany(Games, {
  foreignKey: 'games_id',
  onDelete: 'CASCADE'
});

// Creates a relationship between User and Reviews model, with a "has many" relationship of the User to the Reviews.
User.hasMany(Reviews, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Creates a relationship between User and Comments model, with a "has many" relationship of the User to the User.
User.hasMany(Comments, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Creates a relationship between Games and Reviews model, with a "has many" relationship of the Reviews to the Games.
Games.hasMany(Reviews, {
  foreignKey: 'games_id',
    onDelete: 'CASCADE'
});

// Creates a relationship between Reviews and Games model, with a "belongs to" relationship of the Reviews to the Games.
Reviews.belongsTo(Games, {
  foreignKey: 'games_id',
    onDelete: 'CASCADE'
});

// Creates a relationship between Reviews and User model, with a "belongs to" relationship of the Reviews to the User.
Reviews.belongsTo(User, {
  foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Creates a relationship between Reviews and Comments model, with a "has many" relationship of the Comments to the Reviews.
Reviews.hasMany(Comments, {
  foreignKey: 'reviews_id',
    onDelete: 'CASCADE'
});

// Creates a relationship between Comments and Reviews model, with a "belongs to" relationship of the Comments to the Reviews.
Comments.belongsTo(Reviews, {
  foreignKey: 'reviews_id',
    onDelete: 'CASCADE'
});

// Creates a relationship between Comments and Users model, with a "belongs to" relationship of the Comments to the User.
Comments.belongsTo(User, {
  foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Games, Reviews, Comments };
