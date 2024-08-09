const router = require('express').Router();
const { User, Games, Reviews, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    if (req.session.user_id) {
      const userData = await User.findByPk(req.session.user_id, {
        raw: true,
        attributes: { exclude: ['password'] }
      });

      const gamesData = await Games.findAll();

      const games = gamesData.map((game) => game.get({ plain: true }));
      // get random number for displaying random game image.
      const randnum = Math.floor(Math.random() * games.length);

      const randgame = games[randnum];

      // Pass serialized data and session flag into template
      res.render('homepage', {
        ...randgame,
        ...userData,
        logged_in: req.session.logged_in
      });
    }
    const gamesData = await Games.findAll();

    const games = gamesData.map((game) => game.get({ plain: true }));
    // get random number for displaying random game image.
    const randnum = Math.floor(Math.random() * games.length);

    const randgame = games[randnum];

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
    const gameData = await Games.findByPk(req.params.id, {
      include: [
        {
          model: Reviews,
        },
        {
          model: Comments
        },
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

router.get('/game/:genre', async (req, res) => {
  try {
    const gameData = await Games.findAll({
      where: req.params.genre,
      order: ['title', 'ASC'],
      raw: true,
   });

   let randindex = [];
   
   while(randindex.length < 5) {

     const randnum = Math.floor(Math.random() * gameData.length);

     if(!randindex.includes(randnum)) {
      randindex.push(randnum)
     };

   };

   const randomFiveGames = [gameData[randindex[0]], gameData[randindex[1]], gameData[randindex[2]], gameData[randindex[3]], gameData[randindex[4]]];

   res.render('genreGames', {
    ...randomFiveGames,
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
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
