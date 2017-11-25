const express = require('express');
const { Comment, CommentVote } = require('../models');

const router = express.Router();

router.post('/new', (req, res) => {
  if(!req.body.comment) {
    return res.status(400).json({
      success: false,
      error: "You must not send an empty comment"
    });
  }
  console.log("REQ BODY", req.body);
  req.body.content = req.body.comment;
  req.body.userId = req.user.id;
  return Comment.create(req.body).then(comment => {
    comment = comment.get();
    comment.user = req.user;
    res.json(comment);
  })
})

router.post('/reply', (req, res) => {
  if(!req.body.comment) {
    return res.status(400).json({
      success: false,
      error: "You must not send an empty comment"
    });
  }
  req.body.content = req.body.comment;
  req.body.userId = req.user.id;
  return Comment.create(req.body).then(comment => {
    comment = comment.get();
    comment.user = req.user;
    console.log("comment", comment);
    res.json(comment);
  })
});
router.post('/vote', (req, res) => {
  req.body.upvote = req.body.vote;
  req.body.userId = req.user.id;
  return CommentVote.find({where: {userId: req.user.id, commentId: req.body.commentId}})
  .then(commentVote => {
    if(!commentVote) {
      return CommentVote.create(req.body).then(vote => {
        returnNewComment(vote.commentId, req, res);
      });
    } else {
      //Already created so just change the voteComment
      return commentVote.update({upvote: req.body.upvote})
      .then(commentVote => {
        returnNewComment(commentVote.commentId, req, res);
      })
    }
  })

})

router.post('/unvote', (req, res) => {
  console.log("req body", req.body.commentId)
  CommentVote.find({where: {commentId: req.body.commentId, userId: req.user.id}})
  .then(commentVote => {
    console.log("WHAT")
    return commentVote.destroy();
  })
  .then(() => {
    return Comment.findById(req.body.commentId)
  })
  .then(comment => {
    returnNewComment(comment.id, req, res);
  })

});

function returnNewComment(commentId, req, res) {
  Comment.findById(commentId).then(comment => {
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
            if(vote.userId == req.user.id) {
              comment.upvoted = true;
            }
          } else {
            comment.downvotes++;
            if(vote.userId == req.user.id) {
              comment.downvoted = true;
            }
          }

        });
        comment.user = req.user;
        res.json(comment);
      } else {
        res.json(comment);
      }
    });
  })
}
module.exports = router;
