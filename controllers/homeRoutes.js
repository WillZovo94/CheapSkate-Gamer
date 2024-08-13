const router = require('express').Router();
const { User, Games, Reviews, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    let userData = {};
    if (req.session.logged_in) {
      userData = await User.findByPk(req.session.user_id, {
        raw: true,
        attributes: { exclude: ['password'] }
      });
    }

    const gamesData = await Games.findAll();
    const games = gamesData.map((game) => game.get({ plain: true }));
    const randnum = Math.floor(Math.random() * games.length);
    const randgame = games[randnum];

    const gatheredData = {
      ...randgame,
      ...userData,
      logged_in: req.session.logged_in
    };

    res.render('homepage', gatheredData);
  } catch (err) {
    res.status(500).json(err);
  };
});

// Used when Finding a single game using title search on homepage
router.get('/game/:id', async (req, res) => {
  try {
    const gameData = await Games.findByPk(req.params.id, {
      include: [
        {
          model: Reviews,
        },
        // {
        //   model: Comments
        // },
      ],
    });

    const game = gameData.get({ plain: true });

    res.render('gamePage', {
      ...game,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

<<<<<<< HEAD
=======

>>>>>>> 4596b4c7438e41e0be76bb643aad1dba926e2950
router.get('/genre/:genre', async (req, res) => {
  try {
    const gameGenreSearch = await Games.findAll({
      where: { genre: req.params.genre },
      raw: true,
    });

    if (gameGenreSearch.length === 0) {
      res.status(404).json({ message: 'Could not find that genre.' });
    } else {
      res.render('genreGames', {
        games: gameGenreSearch,
        logged_in: req.session.logged_in
      });
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
