/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-26 2:36:27 pm
 * @copyright TechnomancyIT
 */

const copyDir = require('copy-dir');

path = require('path');

fs = require('fs');

module.exports = async (forgeConfig, options) => {
  const plugindir = path.join(__dirname, '../', 'src/plugins/');
  const webpackdir = path.join(__dirname, '../', 'plugins');

  setTimeout(async () => {
    //fs.mkdirSync(path.join(webpackdir, '../'));
    //    fs.mkdirSync(path.join(webpackdir));
    // await copyDir.sync(
    //   path.join(__dirname, '../', 'src/plugins/'),
    //   path.join(__dirname, '../', 'plugins')
    // );
  }, 500);
};
