const sequelize = require('../config/connection');
const { User, Games, Reviews, Comments } = require('../models');

const userData = require('./userData.json');
const gamesData = require('./gamesData.json');
const reviewsData = require('./reviewsData.json');
const commentsData = require('./commentsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const games of gamesData) {
    await Games.create({
      ...games,
    });
  }

  for (const reviews of reviewsData) {
    await Reviews.create({
      ...reviews,
    });
  }

  for (const comments of commentsData) {
    await Comments.create({
      ...comments,
    });
  }

  process.exit(0);
};

seedDatabase();
