module.exports = {
  strategy: require('passport-google-oauth20').Strategy,
  normalizeProfileFn: function(profile) {
    return {
      'login': profile.id,
      'name': profile.displayName || null,
      'url': profile.profileUrl || 'https://google.com',
      'avatarUrl': profile.photos[0].value,
    }
  }
}
