import isDev from 'electron-is-dev';
import { nanoid } from 'nanoid';
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-26 9:17:34 pm
 * @copyright TechnomancyIT
 */

//TODO: Scan folders and find plugins

import log from 'electron-log';
import path from 'path';
import fs from 'fs';
import {
  createConfig,
  getConfig,
  deleteConfig,
  updateConfig,
} from './configurator';
import importLazy from 'import-lazy';
const importFrom = require('import-from');

import requireFromString from 'require-from-string';
import Plugin from '../models/Plugin';
import { sequelize } from './database';
import { isRenderFinished } from '../main';
import { PluginAcceptWindow } from '../windows/pluginAcceptWindow/PluginAccept';
import fR from 'electron-first-run';
import { asyncForEach } from '../functions';
import { loadPlugins } from './compiledPluginLoader';

// import pluginsMainProcess from './pluginMainImporter';

// const pluginMain: any = pluginsMainProcess;

// .map((fileList) => fileList.substr(0, fileList.length - 3));

async function loadPopup(opts: any) {
  await isRenderFinished();

  PluginAcceptWindow(opts);
}

export async function loader() {
  await sequelize.sync();

  if (isDev) {
    await deleteConfig('plugins', 'pluginLocation');
    await deleteConfig('plugins', 'list');
    await Plugin.destroy({ where: { name: 'ARPaper' } });
  }

  const pluginLocation = await getConfig(
    'application',
    'plugins',
    'pluginLocation'
  );

  const pluginDirectory = path.join(
    __dirname,
    `../${isDev ? '../../' : '../'}`,
    'cloutPlugins'
  );

  const pluginFileList = fs.readdirSync(pluginDirectory);

  //Developer option to delete store to test.

  log.info('Plugin loader started');
  let plugins: any[];
  let foundPlugins: any;
  try {
    foundPlugins = await getConfig('application', 'plugins', 'list');

    plugins = [...Object.keys(foundPlugins)];
  } catch (e) {
    console.log(e);
    plugins = [];
  }

  await asyncForEach(plugins, async (plugin: any) => {
    const index = pluginFileList.indexOf(plugin);
    if (index > -1) {
      console.log('PLUGIN', plugin);
      const pluginCheck = await Plugin.findOne({ where: { name: plugin } });
      if (pluginCheck?.enabled) {
        const id = nanoid();
        pluginCheck.ipcId = id;
        await pluginCheck.save();
        // loadPlugins(
        //   plugin.name,
        //   path.join(`${pluginDirectory}/${plugin.name}/${plugin.fileName}`)
        // );
        __non_webpack_require__(
          path.resolve(
            `${pluginDirectory}/${plugin}`,
            foundPlugins[plugin].mainProcess
          )
        ).default(id);
      }
      pluginFileList.splice(index, 1);
    }
  });

  if (pluginFileList.length > 0) {
    let plugins: any = {};
    pluginFileList.map((plugin) => {
      log.info(`${plugin} is loading for the first time`);

      let myPluginDirectory = `${pluginDirectory}/${plugin}`;
      log.info('PLGS', myPluginDirectory);

      let config: any;
      try {
        config = fs.readFileSync(`${myPluginDirectory}/config.json`, 'utf-8');
      } catch (e) {}
      if (config) {
        config = JSON.parse(config);
        plugins[config.name] = { ...config, path: myPluginDirectory };
      } else
        log.error(`Could not find plugin configuration file for ${plugin}.`);

      //Development remove when done testing
      //   Plugin.destroy({ where: { name: config.name } });

      if (plugins[config.name].mainProcess) {
        try {
          const id = nanoid();

          Plugin.create({ name: config.name, enabled: false, ipcId: id }).then(
            (data) => {
              loadPopup({ myPluginDirectory, ...config });
            }
          );

          // __non_webpack_require__(
          //   path.resolve(myPluginDirectory, plugins[config.name].mainProcess)
          // ).default(id);
        } catch (e) {
          console.log(e);
        }
      }
    });

    // Object.keys(plugins).map((key: string) => {
    //   const plugin = plugins[key];
    //   if (plugin.mainProcess) {
    //     try {
    //     } catch (e) {}
    //   }
    // });
    // console.log('ITS THIS', plugins);
    // const isFirstRun = fR();
    // console.log('FIRSTRUN', isFirstRun);
    // if (isFirstRun) createConfig('application', 'plugins', { list: plugins });
    updateConfig('plugins', { list: plugins });
  }
}
