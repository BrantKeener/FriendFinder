
// TODO GET route with the url `/api/firends' that displays the JSON of all possible friends
// TODO POST route `/api/friends' that handles incoming survey results

const quizData = require('../data/friends.js');

apiJsonDisplay = (app) => {
    app.get('/api/friends', (req, res) => {
        res.json(quizData);
    });
};

module.exports = apiJsonDisplay;