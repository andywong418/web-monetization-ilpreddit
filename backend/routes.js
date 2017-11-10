const express = require('express');
const userRoutes = require('./api/user');
const postRoutes = require('./api/post');
const { Post } = require('./models');

const router = express.Router();

// SAMPLE ROUTE
router.use('/users', (req, res) => {
  res.json({ success: true });
});

router.get('/post/all', async (req, res) => {
  const post = await Post.findAll({
    order: [
      ['createdAt', 'DESC'],
    ],
  });
  const postContents = post.map(postInstance => postInstance.get());
  return res.status(200).json({
    success: true,
    posts: postContents,
  });
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

router.use('/user', userRoutes);
router.use('/post', postRoutes);

module.exports = router;
