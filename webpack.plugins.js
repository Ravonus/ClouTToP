/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-26 2:04:38 pm
 * @copyright TechnomancyIT
 */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
  new MiniCssExtractPlugin(),
  new ForkTsCheckerWebpackPlugin({
    async: true,
  }),
];
