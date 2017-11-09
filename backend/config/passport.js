/*
  config/passport.js
  Configures strategies for use with passport authentication
*/
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models');

const passportSetup = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  passport.use(new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const user = await User.findOne({
          where: {
            username,
          },
        });
        if (!user) {
          return done(null, false, req.flash('loginMessage', 'No user was found with that username.'));
        }
        if (password !== user.password) {
          return done(null, false, req.flash('loginMessage', 'Wrong password!'));
        }
        return done(null, user);
      } catch (err) {
        console.error('Error in verifying user login: ', err);
        return done(err, false);
      }
    },
  ));
};

module.exports = passportSetup;
