const express = require('express');
const { Post, Subreddit } = require('../models');

const router = express.Router();

// req.body = { title: <VARCHAR>, content: <TEXT>, subredditId: <TEXT> }
router.post('/new', async (req, res) => {
  if (!(req.body.title && req.body.content && req.body.subredditId)) {
    return res.status(400).json({
      success: false,
      error: 'You must send title, content, and subredditId in your request!',
    });
  }

  const subreddit = await Subreddit.findById(req.body.subredditId);
  if (!subreddit) {
    return res.status(400).json({
      success: false,
      error: 'Invalid subredditId was provided',
    });
  }
  const post = await Post.create({
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl
  });


  const promiseArray = [
    post.setSubreddit(subreddit),
    post.setUser(req.user),
  ];
  await Promise.all(promiseArray);
  return res.status(200).json({
    success: true,
  });
});



module.exports = router;
