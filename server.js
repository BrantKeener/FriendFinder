
// This is where the server functionality lives
// The constants that house express, and it's variables.

const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

// Setup so that our server can properly work with JSON data
app.use(express.urlencoded( {extended: true} ));
app.use(express.json());
app.use('/static', express.static('./app/public'));

// Make sure this comes after your app.use declaration since it will need the urlencoded, and json methods do work through the api data.
require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

// Our app is listening
app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
});