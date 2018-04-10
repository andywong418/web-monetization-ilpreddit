const express = require('express');
const { Comment, CommentVote } = require('../models');
const plugin = require('ilp-plugin')();
const SPSP = require('ilp-protocol-spsp');

const router = express.Router();

router.post('/new', (req, res) => {
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

});

router.post('/unvote', (req, res) => {
  CommentVote.find({where: {commentId: req.body.commentId, userId: req.user.id}})
    .then(commentVote => {
      return commentVote.destroy();
    })
    .then(() => {
      return Comment.findById(req.body.commentId)
    })
    .then(comment => {
      returnNewComment(comment.id, req, res);
    });

});

router.post('/giveGold', async (req, res) => {
  // Pay
  console.log('connecting plugin', req.body);
  await plugin.connect();
  console.log('sending payment to ' + req.body.paymentPointer );
  await SPSP.pay(plugin, {
    receiver: req.body.paymentPointer,
    sourceAmount: '200'
  });
  console.log("paid");
  // Add one more to comment gold
  Comment.findById(req.body.commentId)
    .then(comment => {
      // Increment the gold count by one.
      return comment.update({ gold: comment.gold + 1 });
    })
    .then(comment => {
      res.json({
        gold: comment.gold,
        id: comment.id
      });
    })

})

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
