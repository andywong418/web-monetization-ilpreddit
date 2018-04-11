const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.get('/logout', (req, res) => {
  req.logout();
  return res.status(200).json({
    success: true,
  });
});

router.get('/:username', async (req, res) => {
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

router.get('/', async (req, res) => {
  const userCopy = Object.assign({}, req.user);
  delete userCopy.password;
  res.status(200).send(userCopy);
});

module.exports = router;
