/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-07-09 12:20:06 am
 * @copyright TechnomancyIT
 */
import fs from 'fs';
import path from 'path';

function testPluginRequire(filePath: string) {
  try {
    fs.existsSync(filePath);
  } catch (e) {
    return new Error('Issue loading plugin script');
  }
  return path.resolve(filePath).replace(/\\/g, '\\\\');
}

export function loadPlugins(name: string, filePath: string) {
  const checkedFilePath = testPluginRequire(filePath);

  if (typeof checkedFilePath !== 'string') return checkedFilePath;

  const mainFilePath = path.join(
    __dirname,
    '../../',
    '.webpack/renderer/main_window/index.js'
  );

  let fileString = fs.readFileSync(mainFilePath, 'utf-8');
  const foundPluginsString = fileString.match(/const plugins = {[^\/]+/);

  if (!foundPluginsString) return new Error('Issue finding plugins');

  const foundPluginBrackets = foundPluginsString[0].match(/{[^}]*/);

  if (!foundPluginBrackets) return new Error('Issue finding plugins brackets.');

  let newPluginString = 'const plugins = ';

  newPluginString += foundPluginBrackets[0].replace(/\n.*$/, '');

  newPluginString += `\n ${name}: require('${checkedFilePath}').default,\n}\n`;

  fileString = fileString.replace(/const plugins = {[^\/]+/, newPluginString);

  fs.writeFileSync(mainFilePath, fileString, 'utf-8');
}

export function removePlugins() {}
