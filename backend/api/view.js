const express = require('express');
const { Post, Comment } = require('../models');
const router = express.Router();
router.get('/post/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      res.json(post);
    })

})

router.get('/post/:id/comments/', (req, res) => {
  Comment.findAll({where: {postId: req.params.id}}).then(comments => {
    res.json(comments);
  })
})
module.exports = router;
