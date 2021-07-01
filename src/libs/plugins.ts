/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-26 9:17:34 pm
 * @copyright TechnomancyIT
 */

import log from 'electron-log';
import path from 'path';
import fs from 'fs';
import { createConfig, getConfig, deleteConfig } from './configurator';
import importLazy from 'import-lazy';
const importFrom = require('import-from');

import requireFromString from 'require-from-string';

// import pluginsMainProcess from './pluginMainImporter';

// const pluginMain: any = pluginsMainProcess;

// .map((fileList) => fileList.substr(0, fileList.length - 3));

export async function loader() {
  const pluginLocation = await getConfig(
    'application',
    'plugins',
    'pluginLocation'
  );

  const pluginDirectory = path.join(__dirname, '../../../', 'cloutPlugins');

  const pluginFileList = fs.readdirSync(pluginDirectory);

  //Developer option to delete store to test.
  deleteConfig('plugins', 'pluginLocation');
  deleteConfig('plugins', 'list');
  log.info('Plugin loader started');
  let plugins: any[];
  try {
    plugins = [...(await getConfig('application', 'plugins', 'list'))];
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
    let plugins: any = {};
    pluginFileList.map((plugin) => {
      log.info(`${plugin} is loading for the first time`);

      let myPluginDirecotry = `${pluginDirectory}/${plugin}`;
      log.info('PLGS', myPluginDirecotry);

      let config;
      try {
        config = fs.readFileSync(`${myPluginDirecotry}/config.json`, 'utf-8');
      } catch (e) {}
      if (config) {
        console.log('ITS THIS');
        config = JSON.parse(config);
        plugins[config.name] = { ...config, path: myPluginDirecotry };
      } else
        log.error(`Could not find plugin configuration file for ${plugin}.`);
      console.log(plugins[config.name]);
      if (plugins[config.name].mainProcess) {
        console.log(
          'RANz',
          `${myPluginDirecotry}/${plugins[config.name].mainProcess}`
        );
        // importFrom(
        //   path.resolve(myPluginDirecotry),
        //   plugins[config.name].mainProcess
        // );
        let file = fs.readFileSync(
          path.resolve(myPluginDirecotry, plugins[config.name].mainProcess),
          'utf-8'
        );
        // importLazy(
        //   require(path.resolve(
        //     myPluginDirecotry,
        //     plugins[config.name].mainProcess
        //   ))()
        // );
        importLazy(requireFromString(file));
      }
    });

    Object.keys(plugins).map((key: string) => {
      const plugin = plugins[key];
      if (plugin.mainProcess) {
        //   pluginMain[plugin.mainProcess];
        // let file = fs.readFileSync(
        //   path.resolve(`${plugin.path}/${plugin.mainProcess}`),
        //   'utf-8'
        // );
        // // file.replace(/require\([^)]+/g, '')

        // const matches = file.match(/require\([^)]+/g);

        // matches?.forEach((match) => {
        //   file = file.replace(
        //     /require\([^)]+/g,
        //     match.replace('__dirname', plugin.path.replace(/\\/g, '/'))
        //   );
        // });
        // importFrom(`${myPluginDirecotry}/${plugin.mainProcess}`);

        //     require(`${myPluginDirecotry}/${plugin.mainProcess}`);
        // require(path.resolve(`${plugin.path}/${plugin.mainProcess}`));
        try {
          //   requireFromString(file);
        } catch (e) {}
      }
    });

    createConfig('application', 'plugins', { list: plugins });
  }
}
