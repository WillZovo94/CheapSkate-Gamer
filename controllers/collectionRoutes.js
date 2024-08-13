const router = require('express').Router();
const { Op } = require('sequelize');
const { User, Games, Reviews, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // If user is logged in finds the user data to display on the page
    if (req.session.logged_in) {
      const userData = await User.findByPk(req.session.user_id, {
        raw: true,
        attributes: { exclude: ['password'] }
      });

      const gamesData = await Games.findAll({ where: {id:{[Op.in]:userData.collection}} });

      const games = gamesData.map((game) => game.get({ plain: true }));

      // Pass serialized data and session flag into template
      res.render('collection', {
        games,
        ...userData,
        logged_in: req.session.logged_in
      });
    };
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