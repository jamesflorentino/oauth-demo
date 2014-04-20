var express = require('express');
var db = require('../database');

var digest = require('../digest');
var _ = require('lodash');

module.exports = function(app) {
    var router = express.Router();
    router.route('/')
        .get(app.oauth.authorise(),function(req, res) {
            db.User.findAll()
                .success(function(users) {
                    res.json(users.map(function(user) {
                        return _.pick(user, [
                            'id',
                            'firstName',
                            'lastName',
                            'username',
                            'email',
                            'createdAt'
                        ]);
                    }));
                });
        })
        .post(function valiateAdminRights(req, res, next) {
            if (req.get('x-admin') !== process.env.ADMIN_KEY) {
                res.send(403);
                return;
            }
            next();
        }, function validatePassword(req, res, next) {
            var password = req.body.password || '';
            var errors = [];
            if (password.length < 6) {
                errors.push('must have at least 6 characters');
            }
            var numberMatches = password.match(/\d/g);
            numberMatches = numberMatches ? numberMatches.length : 0;
            if (numberMatches < 3) {
                errors.push('must have at least 3 number');
            }
            if (errors.length) {
                res.send(400, { errors: errors });
                return;
            }
            next();
        }, function checkUserDuplicate(req, res, next) {
            db.User.find({ where: ['username=? or email=?', req.body.username, req.body.email] })
                .success(function(user) {
                    if (user) {
                        var errors = [];
                        if (req.body.username === user.username) {
                            errors.push('username is taken');
                        }
                        if (req.body.email === user.email) {
                            errors.push('email is taken');
                        }
                        res.send(412, { errors: errors });
                        return;
                    }
                    next();
                });
        }, function createUser(req, res) {
            db.User.create({
                username: req.body.username,
                password: digest(req.body.password)
            })
            .success(function(user) {
                res.send(201, user);
            });
        });
    router.route('/:user_id')
        .get(function(req, res) {
            db.User.find(req.params.user_id)
                .success(function(user) {
                    res.json(user);
                });
        });
    router.route('/:user_id/oauth')
        .put(function checkRedirectURI(req, res, next) {
            var errors = [];
            if (!req.body.redirectUri) {
                errors.push('redirectUri field required');
            }
            if (errors.length) {
                res.send(400, errors);
                return;
            }
            next();
        }, function findUser(req, res) {
            db.User.find(req.params.user_id)
                .success(function(user) {
                    if (!user) {
                        res.send(403);
                        return;
                    }
                    db.Client.findOrCreate({
                        clientId: digest(user.username),
                        clientSecret: digest(user.password),
                        userId: user.id
                    })
                    .success(function(client, created) {
                        res.send(created ? 201 : 200, client);
                    });
                });
        });
    return router;
};
