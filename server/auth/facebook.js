module.exports = {
  strategy: require('passport-facebook').Strategy,

  opts: {
    strategy: {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      profileFields: ['id', 'displayName', 'email', 'picture']
    },

    login: {
      scope: ['email', 'public_profile' ]
    },

    callback: {
      failureRedirect: '/login'
    }
  },

  normalizeProfileFn: function(profile) {
    return {
      'login': profile.id,
      'email': profile._json.email,
      'name': profile.displayName || null,
      'url': profile.profileUrl || '',
      'avatarUrl': profile.photos[0].value || ''
    }
  }
}
