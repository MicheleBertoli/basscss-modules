const path = require('path');
const atImport = require('postcss-import');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/assets/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&localIdentName=[local]--[hash:base64:5]&importLoaders=1!postcss',
      },
    ],
  },
  postcss: () => [atImport()],
};
