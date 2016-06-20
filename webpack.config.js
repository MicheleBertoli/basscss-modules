const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const atImport = require('postcss-import');

module.exports = {
  entry: './src/index.js',
  output: {
    path: 'build',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.css'],
    root: [
      path.resolve(path.join(process.cwd(), './src/styles')),
    ],
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
  plugins: [new HtmlWebpackPlugin()],
  postcss: () => [atImport()],
};
