const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const gameRoutes = require('./gameRoutes')

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/games', gameRoutes);

module.exports = router;
