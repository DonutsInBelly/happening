const LocalStrategy = require('passport-local').Strategy;

const init = function PassportSetup(passport) {
  passport.serializeUser((user, callback)=>{

  });

  passport.deserializeUser((id, callback)=>{
    // DB Lookup
  });

  passport.use(new LocalStrategy({
    // lmao
  }));
}

model.exports = init;
