const sequelize = require('../config/connection');
const { User, Games, Reviews, Comments } = require('../models');

const userData = require('./userData.json');
//const gamesApiData = require('./gamesApiData.json'); // Used for local testing
const reviewsData = require('./reviewsData.json');
const commentsData = require('./commentsData.json');

const fetchGames = async () => { // Fetches the full game list from the api
  const url = "https://www.freetogame.com/api/games";
  try {
    const response = await fetch(url, { cache: "reload" });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return (json);
    }
  catch (error) {
    console.error(error.message);
  }
}

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const liveGameList = await fetchGames();
  
 for (const games of liveGameList) {
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

module.exports = { seedDatabase } ;