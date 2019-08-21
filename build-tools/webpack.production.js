const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = () => ({
  entry: ['./src/index'],
  devtool: 'cheap-source-map',
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },

  mode: 'production',
  module: {},
  plugins: [],
  output: { path: path.join(__dirname, '/../out'), filename: 'server.js' }
});
