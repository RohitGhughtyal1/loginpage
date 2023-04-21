require('dotenv').config();
// require('./password-setup')



const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();
app.set('view engine', 'ejs');

app.use(session({
    secret: '12-your-secret-key',
    resave: false,
    saveUninitialized: false
  }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

function checkLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
      // User is logged in, so call the next middleware function
    //   next();
    } else {
      // User is not logged in, so redirect to the login page
      res.redirect('/');
    }
  }
  

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


// Define the endpoint
app.get('/', (req, res) => {
    res.render("pages/index");
});

app.get('/profile' ,(req, res) => {
    // console.log(req.user);
    if(req.user)
        res.render("pages/profile.ejs", {req: req});
    else
        res.redirect('/');
});


app.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/fail' }),
    (req, res) => {
        // Successful authentication, redirect to home page or do something else
        // res.send(toString(res));
        res.redirect('/profile');
    }
);

app.get('/logout', function(req, res){
    req.logout(function(){
      res.redirect('/');
    });
  });


// app.get('/logout', (req, res) => {
//     req.session = null;

//     req.logout();
//     res.redirect('/');
// });





// Your other code goes here

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});
