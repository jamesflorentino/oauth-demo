var express = require('express');

module.exports = function(app) {
    var router = express.Router();
    router.route('/')
        .get(app.oauth.authorise(), function(req, res) {
            res.send('Welcome!');
        });
    return router;
};
