/*jshint node:true */
'use strict';

var express = require('express');
var authControllers = require('./auth-controller');

var auth = require('./index');
var authRouter = express.Router();

function redirectRoot(req, res) {
  res.redirect('/');
}

// GitHub
authRouter
  .use('/login/callback/github',
       auth.authenticate('github'),
       redirectRoot)

authRouter
  .get('/login/github',
       auth.authenticate('github'));

// Google
authRouter
  .use('/login/callback/google',
       auth.authenticate('google', { failureRedirect: '/login' } ),
       redirectRoot);

authRouter
  .get('/login/google',
       auth.authenticate('google', { scope: ['email', 'profile'] }));

// Facebook
authRouter
  .use('/login/callback/facebook',
       auth.authenticate('facebook'),
       redirectRoot);
authRouter
  .get('/login/facebook',
       auth.authenticate('facebook', { scope: ['email', 'public_profile' ]} ));


// Twitter
authRouter
  .use('/login/callback/twitter',
       auth.authenticate('twitter'),
       redirectRoot);

authRouter
  .get('/login/twitter',
       auth.authenticate('twitter'));



authRouter
  .use('/login/callback/box',
       auth.authenticate('box'),
       redirectRoot);

authRouter
  .get('/login/box',
       auth.authenticate('box'));

// All
authRouter.use('/user', authControllers.getUser);
authRouter.use('/logout', authControllers.logout);

module.exports = authRouter;
