/*jshint node:true */
'use strict';

var config = require('config');
var passport = require('passport');
var r = require('../db');

passport.serializeUser(function (user, done) {
  return done(null, user.id);
});


passport.deserializeUser(function (id, done) {
  r
    .table('users')
    .get(id)
    .run(r.conn)
    .then(function (user) {
      done(null, user);
    });
});


function loginCallbackHandler(objectMapper) {
  return function (accessToken, refreshToken, profile, done) {
    if (accessToken === null)
      return;

    console.log("profile="+JSON.stringify(profile,2,2))

    var dbprofile = objectMapper(profile);
    dbprofile.type = profile.provider;

    console.log("normalized profile="+JSON.stringify(dbprofile,2,2))

    r
      .table('users')
      .getAll(dbprofile.login, { index: 'login' })
      .filter({ type: dbprofile.type })
      .run(r.conn)
      .then(function (users) {
        return r
          .table('users')
          .insert(dbprofile)
          .run(r.conn)
          .then(function (response) {
            return r.table('users')
              .get(response.generated_keys[0])
              .run(r.conn);
          })
          .then(function (newUser) {
            done(null, newUser);
          });
      })
      .catch(function (err) {
        console.log('Error Getting User', err);
      });
  }
};



passport.generateStrategy = function(type) {
  var info = require('./' + type);
  var opts = config.has(type) ? config.get(type) : info.opts.strategy;
  opts.callbackURL = config.callbackURL + type;
  console.log("passport registering strategy " + type + " opts = " + JSON.stringify(opts,2,2));
  return new info.strategy(opts, loginCallbackHandler(info.normalizeProfileFn));
}

passport.initStrategy = function(type) {
  passport.use(passport.generateStrategy(type));
}


passport.checkIfLoggedIn = function (req, res, next) {
  if (req.user) {
    return next();
  }
  return res.status(401).send('You\'re not logged in');
};

module.exports = passport;
