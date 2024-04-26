module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@env': './env',
          '@assets': './src/assets',
          '@components': './src/components',
          '@context': './src/context',
          '@hooks': './src/hooks',
          '@navigators': './src/navigators',
          '@screens': './src/screens',
          '@themes': './src/themes',
          '@services': './src/services',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
