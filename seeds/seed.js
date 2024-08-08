const sequelize = require('../config/connection');
const { User, Games, Reviews, Comments } = require('../models');

const userData = require('./userData.json');
const gamesApiData = require('./gamesApiData.json');
const reviewsData = require('./reviewsData.json');
const commentsData = require('./commentsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const games of gamesApiData) {
    await Games.create({games,
      api_id: games.id,
      title: games.title,
      thumbnail: games.thumbnail,
      short_description: games.short_description,
      url: games.game_url,
      genre: games.genre,
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
