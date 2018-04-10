const express = require('express');
const { Post, Comment, User, CommentVote } = require('../models');
const router = express.Router();
const async = require('async');
router.get('/post/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      res.json(post);
    })

})

router.get('/post/:id/comments/', (req, res) => {
  Comment.findAll({ where: { postId: req.params.id }, include: [{ model: User }] }).then(comments => {
    let newCommentArr = [];
    async.eachSeries(comments, (comment, callback) => {
      comment = comment.get();
      comment.upvotes = 0;
      comment.downvotes = 0;
      comment.upvoted = false;
      comment.downvoted = false;
      CommentVote.findAll({where:{commentId: comment.id }}).then(votes => {
        if(votes.length !== 0) {
          votes.forEach(vote => {
            if(vote.upvote) {
              comment.upvotes++;
              if(req.user) {
                if(vote.userId === req.user.id) {
                  comment.upvoted = true;
                }
              }

            } else {
              comment.downvotes++;
              if(req.user) {
                if(vote.userId === req.user.id) {
                  comment.downvoted = true;
                }
              }

            }
          });
          newCommentArr.push(comment);
          callback();
        } else {
          newCommentArr.push(comment);
          callback();
        }
      });
    }, function done() {
      res.json(newCommentArr);
    });
  });
})
module.exports = router;
