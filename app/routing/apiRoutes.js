
// This will be our variable that links to our friends.js file for data storage
const quizData = require('../data/friends.js');

// Export these two methods to the server.js
module.exports = (app) => {

    app.get('/api/friends', (req, res) => {
        res.json(quizData);
    });

    app.post('/api/friends', (req, res) => {
        quizData.push(req.body);
        res.json(true);
    });
};