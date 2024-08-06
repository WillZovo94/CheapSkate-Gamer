const router = require('express').Router();
const { User, Game } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const gamesData = await Game.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    // Serialize data so the template can read it
    const randnum = Math.floor(Math.random() * Games.length) // get random number for displaying random game image.
    const games = gamesData.map((project) => project.get({ plain: true }));

    const randgame = games[randnum]

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      ...randgame,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Used when Finding a single game using title search on homepage
router.get('/game/:id', async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.id, {
      include: [
        {
          model: Review,
        },
        {
          model: Comment
        },
      ],
    });

    const game = gameData.get({ plain: true });

    res.render('gamepage', {
      ...game,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/game/:genre', async (req, res) => {
  try {
    const gameData = await Game.findAll({
      where: req.params.genre,
      order: ['title', 'ASC'],
      raw: true,
   });

   const fiveGame = gameData.splice(0,4);

   res.render('genreGames', {
    ...fiveGame,
    logged_in: req.session.logged_in
   });

  } catch (err) {
    res.status(500).json(err)
  }
})

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
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
