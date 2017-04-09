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

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, username, password, callback)=>{
    User.findOne({ 'email': username }, (err, user)=>{
      if(err) {
        return callback(err);
      }
      if(!user) {
          return callback(null, false);
      }
      if(!user.check(password)) {
        return callback(null, false);
      }
      return callback(null, user);
    });
  }));

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, username, password, callback)=>{
    
  }));
}

module.exports = init;
