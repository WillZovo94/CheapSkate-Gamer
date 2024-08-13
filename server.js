const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const { User, Games, Reviews, Comments } = require('./models'); // Seeding the database
const userData = require('./seeds/userData.json');
const reviewsData = require('./seeds/reviewsData.json');
const commentsData = require('./seeds/commentsData.json');
const gamesApiData = require('./seeds/gamesApiData.json'); // Used for local testing

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

const fetchGames = async () => { // Fetches the full game list from the freetogame api
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

const seedDatabase = async () => { // Seeds the database with either the stored values or freetogame api fetch
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // const liveGameList = await fetchGames();
  
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
};

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));

seedDatabase();
});
