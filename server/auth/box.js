module.exports = {
  strategy: require('passport-box').Strategy,
  normalizeProfileFn: function(profile) {
    return {
      'login': profile.id,
      'name': profile.name || null,
      'url': '',
      'avatarUrl': profile._json.avatar_url
    }
  }
}

