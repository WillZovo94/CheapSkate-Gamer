const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const gameRoutes = require('./gameRoutes')
const reviewRoutes = require('./reviewRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/games', gameRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
