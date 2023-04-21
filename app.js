require('dotenv').config();
require('./password-setup')

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express();
app.set('view engine', 'ejs');

app.use(session({
    secret: '12-your-secret-key',
    resave: false,
    saveUninitialized: false
  }));

app.use(passport.initialize());
app.use(passport.session());


// Define the endpoint
app.get('/', (req, res) => {
    if(req.user)
        res.redirect('/profile')
    else
        res.render("pages/index");
});

app.get('/profile' ,(req, res) => {
    if(req.user)
        res.render("pages/profile.ejs", {req: req});
    else
        res.redirect('/');
});

app.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/fail' }),
    (req, res) => {
        // Successful authentication, redirect to home page or do something else
        res.redirect('/profile');
    }
);

app.get('/logout', function(req, res){
    req.logout(function(){
      res.redirect('/');
    });
  });

// Your other code goes here

app.listen(3000, function () {
    console.log('Server listening on port 3000');
});