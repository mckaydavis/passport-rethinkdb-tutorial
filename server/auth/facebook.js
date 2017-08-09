module.exports = {
  strategy: require('passport-facebook').Strategy,
  normalizeProfileFn: function(profile) {
    return {
      'login': profile.id,
      'email': profile._json.email,
      'name': profile.displayName || null,
      'url': profile.profileUrl || '',
      'avatarUrl': ''
    }
  }
}
