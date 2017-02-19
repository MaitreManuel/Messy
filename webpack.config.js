var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/application.js',
  output: { path: __dirname + '/build', filename: 'application.js' },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react']
        }
      }
    ]
  },
};
