require('dotenv').config();
require('./password-setup')

const express = require('express');
const passport = require('passport');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define the endpoint
app.get('/', (req, res) => {
    res.render("pages/index");
    //   res.send('Hello!');
});
app.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));


// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
