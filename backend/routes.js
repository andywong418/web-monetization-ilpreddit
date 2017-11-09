const express = require('express');

const router = express.Router();

// SAMPLE ROUTE
router.use('/users', (req, res) => {
  res.json({ success: true });
});


// AUTH WALL (only logged in users can access the below routes)
router.use((req, res, next) => {
  if(!req.user) {
    return res.status(401).json({
      success: false,
      
    });
  }
  return next();
});

router.get('/logout', (req, res) => {

});

module.exports = router;
