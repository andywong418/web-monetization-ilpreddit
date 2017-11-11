const express = require('express');
const { Comment } = require('../models');

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
  Comment.create(req.body).then(comment => {
    res.json(comment);
  })
})

module.exports = router;
