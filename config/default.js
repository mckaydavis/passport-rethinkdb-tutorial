var config = {
  url: process.env.APP_HOSTNAME || 'localhost',
  port: process.env.APP_PORT || 8000,

  rethinkdb: {
    host: process.env.RETHINKDB_HOST || 'localhost',
    port: process.env.RETHINKDB_PORT || 28015,
    db: process.env.RETHINKDB_DBNAME || 'passport_rethinkdb_tutorial'
  },

  github: {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    profileFields: ['id', 'displayName', 'email']
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET
  },
  box: {
    clientID: process.env.BOX_CLIENT_ID,
    clientSecret: process.env.BOX_CLIENT_SECRET
  },

  "dropbox-oauth2": {
    apiVersion: "2",
    clientID: process.env.DROPBOX_CLIENT_ID,
    clientSecret: process.env.DROPBOX_CLIENT_SECRET
  },

};

config.realmURL = 'http://' + config.url + ':' + config.port;
config.callbackURL = 'http://' + config.url + ':' + config.port + '/auth/login/callback/';

module.exports = config;
