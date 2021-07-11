/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-26 2:06:44 pm
 * @copyright TechnomancyIT
 */

const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  target: 'electron-main',

  entry: './src/main.ts',
  // Put your normal webpack config below here
  optimization: {
    minimize: false,
  },
  module: {
    rules: require('./webpack.rules'),
  },

  // output: {
  //   filename: '.webpack/main/[name].js',
  //   path: `${__dirname}/dist`,
  //   publicPath: '',
  // },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.html'],
  },
  externals: [
    nodeExternals(),
  ],
};
