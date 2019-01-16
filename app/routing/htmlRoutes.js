
// Need path to help build the appropriate path to the html page we want.

const path = require('path');

// htmlRouter is a function that is exported to server.js, and receives the app variable as a parameter

htmlRouter = (app) => {
    app.get('*', (req, res) => {
        if(req.url === '/survey') {
            res.sendFile(path.join(__dirname, '../public/survey.html'));
        } else if(req.url !== '/api/friends') {
            res.sendFile(path.join(__dirname, '../public/home.html'));
        }
    });
};

// Export htmlRouter
module.exports = htmlRouter;