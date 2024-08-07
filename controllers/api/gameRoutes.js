const router = require('express').Router();
const { Games } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const gameData = await Games.findOne({
            where: {
                title: req.body.titleSearch
            },
            raw: true,
        });

        if (!gameData) {
            res.status(404).json({ message: 'Could not find that game'});
        };

        res.status(200).json(gameData);
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;