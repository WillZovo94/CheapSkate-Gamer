const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const collectionRoutes = require('./collectionRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/collection', collectionRoutes);

module.exports = router;
