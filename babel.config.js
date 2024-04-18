module.exports = function(api) {
  api.cache(true);
  return {
      // plugins: ["react-native-reanimated/plugin","inline-dotenv","module-resolver"],
      plugins: [
      'inline-dotenv',
      [
        'module:react-native-dotenv',
        {
          alias: {
            assets: './src/assets',
            components: './src/components',
            constant: './src/constant',
            core: './src/pilot',
            navigation: './src/navigation',
            screens: './src/screens',
            store: './src/store',
            utils: './src/utils',
          },
          extensions: ['.js', '.ts', '.tsx'],
          root: ['./'],
        },
      ],
      'react-native-reanimated/plugin',
    ],
    presets: ['babel-preset-expo'],
  };
};
