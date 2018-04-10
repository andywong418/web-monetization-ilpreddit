const express = require('express');
const userRoutes = require('./api/user');
const postRoutes = require('./api/post');
const viewRoutes = require('./api/view');
const commentRoutes = require('./api/comment');
const { Post, Subreddit } = require('./models');

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
    include: [{ model: Subreddit }],
  });
  const postContents = post.map(postInstance => postInstance.get());
  return res.status(200).json({
    success: true,
    posts: postContents,
  });
});

router.use('/view', viewRoutes);
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
router.use('/comment', commentRoutes);
module.exports = router;
