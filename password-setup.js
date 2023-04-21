const passport = require('passport');

passport.serializeUser(function (user, done) {
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
  // passReqToCallback: true
},
  function (accessToken, refreshToken, profile, done) {
      // You can add your own code here to handle user authentication and authorization
      // console.log(profile);
      return done(null, profile);
  }
));


