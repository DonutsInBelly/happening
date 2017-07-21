const mongoose      = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('./user.js');

const init = function PassportSetup(passport) {
  passport.serializeUser((user, callback)=>{
    callback(null, user._id)
  });

  passport.deserializeUser((email, callback)=>{
    User.findOne({ 'email': email }, (err, user)=>{
      callback(err, user);
    });
  });

  // passport.use('local-login', new LocalStrategy({
  //   usernameField: 'username',
  //   passwordField: 'password',
  //   passReqToCallback: true
  // }, (req, username, password, callback)=>{
  //   User.findOne({ 'email': username }, (err, user)=>{
  //     if(err) {
  //       return callback(err);
  //     }
  //     if(!user) {
  //         return callback(null, false);
  //     }
  //     if(!user.check(password)) {
  //       return callback(null, false);
  //     }
  //     return callback(null, user);
  //   });
  // }));

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, username, password, callback)=>{
    process.nextTick(()=>{
      //console.log(req);

      User.findOne({ 'email': username }, (err, user)=>{
        if(err) {
          return callback(err);
        }
        if(user) {
          return callback(null, false);
        } else {
          var newUser = new User();

          newUser.email = username;
          newUser.password = newUser.hash(password);

          var nextAvailableID = User.count({}, (err, count)=>{
            newUser.id = count;
            newUser.save((err)=>{
              if(err) {
                throw err;
              }
              return callback(null, newUser);
            });

          });
        }
      });
    });
  }));
}

module.exports = init;
