const path = require('path');

module.exports = function override(config, env) {
  // Add the following rule to handle mapbox-gl.js
  config.module.rules.push({
    test: /\.js$/,
    include: [
      path.resolve(__dirname, 'node_modules/mapbox-gl/dist/'),
    ],
    use: {
      loader: 'babel-loader',
    },
  });

  return config;
};
