const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
  target: 'electron-renderer',
  optimization: {
    minimize: false,
  },
  // externals: {
  //   fetch: './pluginImporter',
  // },
  // output: {
  //   filename: '[name]-[hash].js',
  //   path: path.join(__dirname, '/.webpack/renderer'),

  //   publicPath: '',
  // },
  module: {
    rules,
  },
  // output: {
  //   filename: '.webpack/renderer/[name].js',
  //   path: `${__dirname}/dist`,
  //   publicPath: '',
  // },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.html'],
  },
  plugins: plugins,
  externals: [nodeExternals()],
};
