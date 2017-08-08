module.exports = {
  strategy: require('passport-facebook').Strategy,
  normalizeProfileFn: function(profile) {
    return {
      'login': profile.id,
      'name': profile.displayName || null,
      'url': profile.profileUrl || '',
      'avatarUrl': ''
    }
  }
}
