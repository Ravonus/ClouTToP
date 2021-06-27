/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-26 9:17:34 pm
 * @copyright TechnomancyIT
 */
import log from 'electron-log';
import { loadStore, setStore, deleteStore } from './store';
import path from 'path';
import fs from 'fs';

const pluginLocation = loadStore('pluginLocation');
const pluginDirectory =
  pluginLocation || path.join(__dirname, '../', 'plugins');

const pluginFileList = fs.readdirSync(pluginDirectory);
// .map((fileList) => fileList.substr(0, fileList.length - 3));

export function loader() {
  deleteStore('plugins');
  log.info('Plugin loader started');
  let plugins: string[];
  try {
    plugins = [...loadStore('plugins')];
  } catch (e) {
    plugins = [];
  }
  plugins.map((plugin) => {
    const index = pluginFileList.indexOf(plugin);
    if (index > -1) {
      pluginFileList.splice(index, 1);
    }
  });
  if (pluginFileList.length > 0) {
    let plugins: any = [];
    pluginFileList.map((plugin) => {
      log.info(`${plugin} is loading for the first time`);
      plugins.push(plugin);
    });

    setStore('plugins', plugins);
  }
}
