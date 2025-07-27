const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure we only bundle for mobile platforms
config.resolver.platforms = ['ios', 'android', 'native'];

module.exports = config; 