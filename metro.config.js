// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

config.transformer.assetRegistryPath =
  'react-native/Libraries/Image/AssetRegistry';

module.exports = config;