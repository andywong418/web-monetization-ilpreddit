const express = require('express');
const { User } = require('./models');

const router = express.Router();

// SAMPLE ROUTE
router.use('/users', (req, res) => {
  res.json({ success: true });
});

// AUTH WALL (only logged in users can access the below routes)
router.use((req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'You must be logged in to hit that route!',
    });
  }
  return next();
});

router.get('/user/logout', (req, res) => {
  req.logout();
  return res.status(200).json({
    success: true,
  });
});

router.get('/user/:username', async (req, res) => {
  const user = User.findOne({
    where: {
      username: req.params.username,
    },
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      error: `Could not find the user ${req.params.username}`,
    });
  }
  const userCopy = Object.assign({}, user);
  delete userCopy.password;
  return res.status(200).json({
    success: true,
    user: userCopy,
  });
});

router.get('/user', async (req, res) => {
  const userCopy = Object.assign({}, req.user);
  delete userCopy.password;
  return res.status(200).json({
    success: true,
    user: userCopy,
  });
});

module.exports = router;
