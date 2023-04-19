require('dotenv').config();
require('./password-setup')

const express = require('express');
// const session = require('express-session');
const passport = require('passport');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');


// app.use(passport.initialize());
// app.use(passport.session());


// Define the endpoint
app.get('/', (req, res) => {
    res.render("pages/index");
});

app.get('/profile', (req, res) => {
    res.render("pages/profile");
});




app.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/fail'
    }),
    (req, res) => {
        // Successful authentication, redirect to home page or do something else
        res.redirect('/profile');
    }
);

// app.use(session({
//     secret: process.env.GOOGLE_CLIENT_SECRET,
//     resave: false,
//     saveUninitialized: false
// }));

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
