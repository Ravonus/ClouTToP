/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-26 2:36:27 pm
 * @copyright TechnomancyIT
 */

var copyFiles = require('copy-dir');

let path = require('path');
let fs = require('fs');

module.exports = async (forgeConfig, options) => {
  console.warn('\n\nprePackage: exclude files ...\n\n');

  const outDirectory = path.join(
    __dirname,
    '../',
    'out/nodepaper-win32-x64/resources/node_modules/'
  );
  const directory = path.join(__dirname, '../', 'node_modules');
  // const sqlite3Directory = path.join(__dirname, '../', 'node_modules/sqlite3');
  // const sequelizeDirectory = path.join(
  //   __dirname,
  //   '../',
  //   'node_modules/sequelize'
  // );
  // const retryDirectory = path.join(
  //   __dirname,
  //   '../',
  //   'node_modules/retry-as-promised'
  // );

  // if (!fs.existsSync(path.join(outDirectory))) {
  //   fs.mkdirSync(path.join(outDirectory));
  // }

  // if (!fs.existsSync(`${outDirectory}retry-as-promised`)) {
  //   fs.mkdirSync(`${outDirectory}retry-as-promised`);
  // }

  // if (!fs.existsSync(`${outDirectory}iohook`)) {
  //   fs.mkdirSync(`${outDirectory}iohook`);
  // }

  // if (!fs.existsSync(`${outDirectory}sequelize`)) {
  //   fs.mkdirSync(`${outDirectory}sequelize`);
  // }

  // if (!fs.existsSync(`${outDirectory}sqlite3`)) {
  //   fs.mkdirSync(`${outDirectory}sqlite3`);

  copyFiles(directory, outDirectory, (err, opt) => {
    console.log(err, opt);
  });

  // copyFiles(ioHookDirectory, `${outDirectory}iohook`, (err, opt) => {
  //   console.log(err, opt);
  // });
  // copyFiles(sqlite3Directory, `${outDirectory}sequelize`, (err, opt) => {
  //   console.log(err, opt);
  // });
  // copyFiles(sequelizeDirectory, `${outDirectory}sequelize`, (err, opt) => {
  //   console.log(err, opt);
  // });
};
