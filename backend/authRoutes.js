/*
  routes/auth.js
  Authentication routes involving Passport.js are defined here
*/
const express = require('express');
const { User } = require('./models');

const router = express.Router();

const auth = (passport) => {
  router.post('/user/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err.message,
        });
      } else if (!user) {
        res.status(200).json({
          success: false,
          error: req.flash('loginMessage')[0] || 'Missing username or password!',
        });
      } else {
        req.logIn(user, (loginError) => {
          if (loginError) {
            res.status(500).json({
              success: false,
              error: loginError.message,
            });
          } else {
            const userCopy = Object.assign({}, user.get());
            delete userCopy.password;
            res.status(200).json({
              success: true,
              user: userCopy,
            });
          }
        });
      }
    })(req, res, next);
  });

  router.post('/user/register', async (req, res) => {
    if (!(req.body.username && req.body.password)) {
      return res.status(200).json({
        success: false,
        error: 'Both the username and password fields are mandatory!',
      });
    }
    try {
      const existingUser = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
      if (existingUser) {
        return res.status(200).json({
          success: false,
          error: 'A user with that username already exists!',
        });
      }
      const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
      });
      const user = newUser.get();
      delete user.password;
      return res.status(201).json({
        success: true,
        user,
      });
    } catch (err) {
      console.error('Error encountered during user creation at POST /register route: ', err);
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  });
  return router;
};

module.exports = auth;
