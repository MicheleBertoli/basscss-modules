const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
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
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&localIdentName=[hash:base64:5]&importLoaders=1!postcss'
        ),
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin(),
    new ExtractTextPlugin('bundle.css', {
      ignoreOrder: true,
    }),
  ],
  postcss: () => [atImport()],
};
