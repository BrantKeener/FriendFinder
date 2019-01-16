
// This is where the server functionality lives
// The constants that house express, and it's variables.

const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

require('./app/routing/htmlRoutes')(app);

// Setup so that our server can properly work with JSON data
app.use(express.urlencoded( {extended: true} ));
app.use(express.json());

// Our app is listening
app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
});