/*jshint node:true */
'use strict';

var express = require('express');
var authControllers = require('./auth-controller');

var auth = require('./index');
var authRouter = express.Router();

function redirectRoot(req, res) {
  res.redirect('/');
}


var types = ['twitter', 'google', 'facebook', 'github', 'box'];

var opts = {
  google: {
    login: { scope: ['email', 'profile'] },
    callback:  { failureRedirect: '/login' }
  },
  facebook: {
    login: { scope: ['email', 'public_profile' ]}
  }
}


for(var type of types) {
  auth.initStrategy(type);

  var optsCallback = opts[type] ? opts[type].callback : undefined;
  var optsLogin = opts[type] ? opts[type].login : undefined;

  authRouter
    .use('/login/callback/' + type,
         auth.authenticate(type, optsCallback),
         redirectRoot);

  authRouter
    .get('/login/' + type,
         auth.authenticate(type, optsLogin));
}


// All
authRouter.use('/user', authControllers.getUser);
authRouter.use('/logout', authControllers.logout);

module.exports = authRouter;
