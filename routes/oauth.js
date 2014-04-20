var express = require('express');
module.exports = function(app) {
    var router = express.Router();
    router.route('/token').all(function(req, res, next) {
        console.log('getting token...');
        next();
    }, app.oauth.grant());
    return router;
};
