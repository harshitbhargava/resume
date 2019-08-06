var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var auser=require('./schema').auser;
passport.use('local',new LocalStrategy({
    usernameField:'emailid',
    passwordField:'password'
},

  function(username, password, done) {
    console.log(username,password);
    auser.findOne({ emailid: username }, function(err, user) {
      console.log(err,user);
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect Email ID.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, auser);
    });
  }
));

passport.serializeUser(function(auser, done) {
    done(null, auser._id);
  });
  
  passport.deserializeUser(function(id, done) {
    auser.findById(id, function(err, user) {
      done(err, user);
    });
  });