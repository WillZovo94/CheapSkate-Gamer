const router = require('express').Router();
const { Reviews } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new review
// without user.id
router.post('/', async (req, res) => {
  try {
    const { title, body, rating, games_id} = req.body;
    console.log(games_id, " YAy");
    const newReview = await Reviews.create({
      title,
      body,
      rating,
      games_id,
      user_id
    });
    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.post('/:id', async (req, res) => { 
//     try {
//         const newReview = await Reviews.create({
//             ...req.body,
//             user_id: req.session.user.id,
//         });
//         res.status(200).json(newReview);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

// Get all review by game id
router.get('/', async (req, res) => {
  try {
      const reviewData = await Reviews.findAll();
      console.log(reviewData)
      res.status(200).json(reviewData);
  } catch (err) {
      res.status(500).json(err);
  }
})

// Get review by game id
router.get('/:gameId', async (req, res) => {
    try {
      console.log('Fetching reviews for game_id:', req.params.gameId);
        const reviewData = await Reviews.findAll({ 
          where: { games_id: req.params.gameId },
        });
        console.log('Reviews Found',reviewData);
        res.status(200).json(reviewData);
    } catch (err) {
        res.status(500).json(err);
    }
  })

// Update a review
router.put('/:id', async (req, res) => {
  try {
    const review = await Reviews.update(
      {...req.body},
      {where: {
        id: `${req.params.id}`

      }}
    )
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json(error);
  }

})

// Delete a review identified by id
router.delete('/:id', async (req, res) => {
  try {
    const reviewData = await Reviews.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!reviewData) {
      res.status(404).json({ message: 'No review found with this id!' })
      return;
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;