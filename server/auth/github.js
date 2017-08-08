module.exports = {
  strategy: require('passport-github').Strategy,
  normalizeProfileFn: function(profile) {
    return {
      'login': profile.username,
      'name': profile.displayName || null,
      'url': profile.profileUrl,
      'avatarUrl': profile._json.avatar_url
    }
  }
}
