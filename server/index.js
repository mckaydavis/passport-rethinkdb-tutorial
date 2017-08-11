/*jshint node:true */
'use strict';

// Load .env values into process.env
require('dotenv').config();

var config = require('config');
var express = require('express');
var engines = require('consolidate');

var app = express();
var auth = require('./auth');
var authRouter = require('./auth/auth-router');

var Session = require('express-session');
var SessionStore = require('session-rethinkdb')

var r = require('./db');

//console.log("Config="+JSON.stringify(config,2,2));

var Store = SessionStore(Session);
var session = Session({
    secret: 'zfnzkwjehgweghw',
    resave: true,
    saveUninitialized: false,
    store: new Store(r)
});

// Middleware
app
  .use(session)
  .use(auth.initialize())
  .use(auth.session());

// Views
app
  .set('views', __dirname + '/views')
  .engine('html', engines.mustache)
  .set('view engine', 'html');

// Routes
app
  .use('/auth', authRouter)
  .get('/', function (req, res) {
    res.render('index.html', { user: req.user });
  })
  .use(express.static(__dirname + '/../client'))
  .use('*', function (req, res) {
    res.status(404).send('404 Not Found').end();
  });

app.listen(config.get('port'));
