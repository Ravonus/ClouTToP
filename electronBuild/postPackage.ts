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
    'out/nodepaper-win32-x64/resources/node_modules/iohook'
  );
  const ioHookDirectory = path.join(__dirname, '../', 'node_modules/iohook');

  console.log(outDirectory, ioHookDirectory);

  if (!fs.existsSync(path.join(outDirectory, '../'))) {
    fs.mkdirSync(path.join(outDirectory, '../'));
  }

  if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory);
  }

  copyFiles(ioHookDirectory, outDirectory, (err, opt) => {
    console.log(err, opt);
  });
};
