const router = require('express').Router();
const { Games } = require('../../models');

router.post('/game', async (req, res) => {
    try {
        const gameData = await Game.findOne({
            where: {
                title: req.session.titleSearch
            },
            raw: true
        });

        if (!gameData) {
            res.status(404).json({ message: 'Could not find that game'});
        };

        res.status(200).json(gameData)
    } catch (err) {
        res.status(500).json(err);
    };
});

// router.post('/game/:id', async (res, req) => {
//     try {
//         const gameData = await Game.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: User, // Need to check that this include works
//                 },
//             ],
//         });

//         const game = gameData.get({ plain: true });

//         res.render('game', {
//             game,
//             logged_in: req.session.logged_in
//         })

//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router;