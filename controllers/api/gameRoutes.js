const router = require('express').Router();
const { Games, Reviews } = require('../../models');

router.get('/', async (req, res) => {
    // Find all games
    try {
      const gameData = await Games.findAll(req.params.id, { include: [{ model: Reviews }] });
      if (!gameData) {
        res.status(404).json({ message: 'No game found by that id!' });
        return;
      }
      res.status(200).json(gameData);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  });

router.get('/:id', async (req, res) => {
    // Find one game by id
    try {
      const gameData = await Games.findByPk(req.params.id, { include: [{ model: Reviews }] });
      if (!gameData) {
        res.status(404).json({ message: 'No game found by that id!' });
        return;
      }
      res.status(200).json(gameData);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  });

router.post('/', async (req, res) => {
    try {
        const gameData = await Games.findOne({
            where: {
                title: req.body.titleSearch
            },
            raw: true,
        });

        if (!gameData) {
            res.status(404).json({ message: 'Could not find that game.'});
        };

        res.status(200).json(gameData);
    } catch (err) {
        res.status(500).json(err);
    };
});

router.post('/genre', async (req, res) => {
    try {
        const gameGenreSearch = await Games.findAll({
            where: { genre: req.body.genreSearch },
            raw: true,
        });
console.log (gameGenreSearch);
        if (!gameGenreSearch) {
            res.status(404).json({ message: 'Could not find that genre.'});
        };
        
        res.status(200).json(gameGenreSearch);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    };
});

router.get('/genre/:genre', async (req, res) => {
  try {
      const gameGenreSearch = await Games.findAll({
          where: { genre: req.params.genre },
          raw: true,
      });

      if (gameGenreSearch.length === 0) {
          res.status(404).json({ message: 'Could not find that genre.' });
      } else {
          res.status(200).json(gameGenreSearch);
      }
  } catch (err) {
      res.status(500).json(err);
      console.log(err);
  }
});

module.exports = router;