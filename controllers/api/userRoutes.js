const router = require('express').Router();
const { User, Games, Reviews, Comments } = require('../../models');

// Get all users from the database and returns all associated data
router.get('/', async (req, res) => {
  try {
    const storedUserData = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [ { model: Games, }, { model: Reviews }, { model: Comments }, ],
    });
    const userData = storedUserData.map((users) => users.get({ plain: true }));
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => { // Gets a single user by id
  try {
    const storedUserData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [ { model: Games, } ],
    });
    res.status(200).json(storedUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/collection/:id', async (req, res) => { // Gets the collection array by user id
  try {
    const storedUserData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [ { model: Games, } ],
    });
    res.status(200).json(storedUserData.collection);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.user-userData;
            
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing a requirement!' })
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  User.create({ username, email, password: hashedPassword })
    .then(user => {
      res.status(201).json({ message: 'User created successfully!' });
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to craete user' })
    })
})

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
