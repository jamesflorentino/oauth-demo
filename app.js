var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var logger = require('morgan');
var oauthServer = require('node-oauth2-server');
var database = require('./database');

app.use(require('body-parser')());
app.use(logger('dev'));

app.oauth = oauthServer({
    model: require('./oauth2'),
    grants: ['password', 'client_credentials', 'refresh_token'],
    debug: true,
    accessTokenLifetime: process.env.NODE_ENV ? null : 1
});

app.use(app.oauth.errorHandler());

app.use('/', require('./routes/index')(app));
app.use('/api/users', require('./routes/users')(app));
app.use('/oauth', require('./routes/oauth')(app));

app.listen(port, function() {
    console.log('Server started... http://localhost:%d', port);
});
