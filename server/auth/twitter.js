module.exports = {
  strategy: require('passport-twitter').Strategy,
  normalizeProfileFn: function(profile) {
    return {
      'login': profile.id,
      'name': profile.displayName || null,
      'url': profile._raw.expanded_url || null,
      'avatarUrl': profile._json.profile_image_url
    }
  }
}

