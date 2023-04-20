require('dotenv').config();
require('./password-setup')

const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express();


app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


// Set EJS as the view engine
app.set('view engine', 'ejs');


app.use(passport.initialize());
app.use(passport.session());



// Define the endpoint
app.get('/', (req, res) => {
    res.render("pages/index");
});

app.get('/profile', (req, res) => {
    res.render('pages/profile.ejs');
});


app.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/google/callback', passport.authenticate('google', {failureRedirect: '/fail'}),
    (req, res) => {
        // Successful authentication, redirect to home page or do something else
        console.log("hi");
        // res.redirect('/profile');
    }
);

app.get('/logout', (req, res) => {
    req.session = null;

    req.logout(function(err) {
        if (err) {
          console.log(err);
        }
        res.redirect('/');
      });

    // req.logout();
    // res.redirect('/');
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
