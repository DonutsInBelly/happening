const LocalStrategy = require('passport-local').Strategy;
const User          = require('./user.js');

const init = function PassportSetup(passport) {
  passport.serializeUser((user, callback)=>{
    callback(null, user.uid)
  });

  passport.deserializeUser((uid, callback)=>{
    User.findOne({ '_id': _id }, (err, user)=>{
      callback(err, user);
    });
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, username, password, done)=>{
    User.findOne({ 'email': email }, (err, user)=>{
      if(err) {
        return done(err);
      }
      if(!user) {
          return done(null, false);
      }
      if(!user.check(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  }));
}

module.exports = init;
