var request = require('supertest');

request = request('http://localhost:5000');

var currentUser;
var client;
var accessToken;
var refreshToken;
var expires;

describe('User registration', function() {
    it('should require a username', function(done) {
        request.post('/api/users')
        .set('x-admin', 'banana')
        .end(function(err, res) {
            if (res.statusCode !== 400) {
                throw 'status code response must be 400';
            }
            done();
        });
    });

    it('should require an email', function(done) {
        request.post('/api/users')
        .set('x-admin', 'banana')
        .send({
            username: 'jamesflorentino'
        })
        .end(function(err, res) {
            if (res.statusCode !== 400) {
                throw 'status code response must be 400';
            }
            done();
        });
    });

    it('should require a password', function(done) {
        request.post('/api/users')
        .set('x-admin', 'banana')
        .send({
            username: 'jamesflorentino',
            email: 'jamesflorentino@gmail.com'
        })
        .end(function(err, res) {
            if (res.statusCode !== 400) {
                throw 'status code response must be 400';
            }
            done();
        });
    });

    it('should reject if password is less than 6 characters', function(done) {
        request.post('/api/users')
        .set('x-admin', 'banana')
        .send({
            username: 'jamesflorentino',
            password: 'baba',
            email: 'jamesflorentino@gmail.com'
        })
        .end(function(err, res) {
            if (res.statusCode !== 400) {
                throw 'status code response must be 400';
            }
            done();
        });
    });

    it('should reject if password has less than 3 numbers', function(done) {
        request.post('/api/users')
        .set('x-admin', 'banana')
        .send({
            username: 'jamesflorentino',
            password: 'banana',
            email: 'jamesflorentino@gmail.com'
        })
        .end(function(err, res) {
            if (res.statusCode !== 400) {
                throw 'status code response must be 400';
            }
            done();
        });
    });

    it('should register a user', function(done) {
        request.post('/api/users')
        .set('x-admin', 'banana')
        .send({
            firstName: 'James',
            lastName: 'Florentino',
            username: 'jamesflorentino',
            password: 'banana123',
            email: 'jamesflorentino@gmail.com'
        })
        .expect(201)
        .end(function(err, res) {
            if (res.statusCode !== 201) {
                throw 'status code must be 201 CREATED';
            }
            currentUser = res.body;
            done();
        });
    });

    it('should reject if username or email already exists', function(done) {
        request.post('/api/users')
        .set('x-admin', 'banana')
        .send({
            username: 'jamesflorentino',
            password: 'banana123',
            email: 'jamesflorentino@gmail.com'
        })
        .expect(412)
        .end(function(err, res) {
            if (res.statusCode !== 412) {
                throw 'User already exists.';
            }
            done();
        });
    });
});

describe('client registration process', function() {
    it('should register first as a user', function(done) {
        request.post('/api/users')
        .set('x-admin', 'banana')
        .send({
            firstName: 'Hue',
            lastName: 'Jass',
            username: 'huejass',
            password: 'datass123',
            email: 'huejass@gmail.com'
        })
        .expect(201)
        .end(function(err, res) {
            currentUser = res.body;
            done();
        });
    });

    it('should be able to obtain a clientId an clientSecret for OAuth2', function(done) {
        request.put('/api/users/' + currentUser.id + '/oauth')
        .send({ redirectUri: 'http://google.com' })
        .end(function(err, res) {
            if (!res.body.clientId) {
                throw 'missing clientId';
            }
            if (!res.body.clientSecret) {
                throw 'missing clientSecret';
            }
            client = res.body;
            done();
        });
    });

    it('should be able to grant client_credentials', function(done) {
        request.post('/oauth/token')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            grant_type: 'client_credentials',
            client_id: client.clientId,
            client_secret: client.clientSecret
        })
        .end(function(err, res) {
            if (err) throw err;
            if (!res.body.access_token) throw 'missing access_token';
            if (!res.body.refresh_token) throw 'missing refresh_token';
            if (!res.body.expires_in) throw 'missing expires';
            accessToken = res.body.access_token;
            refreshToken = res.body.refresh_token;
            expires = res.body.expires_in;
            done();
        });
    });
});
