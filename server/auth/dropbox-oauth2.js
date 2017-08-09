module.exports = {
  strategy: require('passport-dropbox-oauth2').Strategy,
  normalizeProfileFn: function(profile) {
    return {
      'login': profile.id,
      'name': profile.displayName || null,
      'email': profile._json.email,
      'url': '',
      'avatarUrl': ''
    }
  }
}

