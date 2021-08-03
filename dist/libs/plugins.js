var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
import { getConfig, deleteConfig, updateConfig, } from './configurator';
const importFrom = require('import-from');
import Plugin from '../models/Plugin';
import { sequelize } from './database';
import { isRenderFinished } from '../main';
import { PluginAcceptWindow } from '../windows/pluginAcceptWindow/PluginAccept';
import { asyncForEach } from '../functions';
// import pluginsMainProcess from './pluginMainImporter';
// const pluginMain: any = pluginsMainProcess;
// .map((fileList) => fileList.substr(0, fileList.length - 3));
function loadPopup(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        yield isRenderFinished();
        PluginAcceptWindow(opts);
    });
}
export function loader() {
    return __awaiter(this, void 0, void 0, function* () {
        yield sequelize.sync();
        if (isDev) {
            yield deleteConfig('plugins', 'pluginLocation');
            yield deleteConfig('plugins', 'list');
            yield Plugin.destroy({ where: { name: 'ARPaper' } });
        }
        const pluginLocation = yield getConfig('application', 'plugins', 'pluginLocation');
        const pluginDirectory = path.join(__dirname, `../${isDev ? '../../' : '../'}`, 'cloutPlugins');
        const pluginFileList = fs.readdirSync(pluginDirectory);
        //Developer option to delete store to test.
        log.info('Plugin loader started');
        let plugins;
        let foundPlugins;
        try {
            foundPlugins = yield getConfig('application', 'plugins', 'list');
            plugins = [...Object.keys(foundPlugins)];
        }
        catch (e) {
            console.log(e);
            plugins = [];
        }
        yield asyncForEach(plugins, (plugin) => __awaiter(this, void 0, void 0, function* () {
            const index = pluginFileList.indexOf(plugin);
            if (index > -1) {
                console.log('PLUGIN', plugin);
                const pluginCheck = yield Plugin.findOne({ where: { name: plugin } });
                if (pluginCheck === null || pluginCheck === void 0 ? void 0 : pluginCheck.enabled) {
                    const id = nanoid();
                    pluginCheck.ipcId = id;
                    yield pluginCheck.save();
                    // loadPlugins(
                    //   plugin.name,
                    //   path.join(`${pluginDirectory}/${plugin.name}/${plugin.fileName}`)
                    // );
                    __non_webpack_require__(path.resolve(`${pluginDirectory}/${plugin}`, foundPlugins[plugin].mainProcess)).default(id);
                }
                pluginFileList.splice(index, 1);
            }
        }));
        if (pluginFileList.length > 0) {
            let plugins = {};
            pluginFileList.map((plugin) => {
                log.info(`${plugin} is loading for the first time`);
                let myPluginDirectory = `${pluginDirectory}/${plugin}`;
                log.info('PLGS', myPluginDirectory);
                let config;
                try {
                    config = fs.readFileSync(`${myPluginDirectory}/config.json`, 'utf-8');
                }
                catch (e) { }
                if (config) {
                    config = JSON.parse(config);
                    plugins[config.name] = Object.assign(Object.assign({}, config), { path: myPluginDirectory });
                }
                else
                    log.error(`Could not find plugin configuration file for ${plugin}.`);
                //Development remove when done testing
                //   Plugin.destroy({ where: { name: config.name } });
                if (plugins[config.name].mainProcess) {
                    try {
                        const id = nanoid();
                        Plugin.create({ name: config.name, enabled: false, ipcId: id }).then((data) => {
                            loadPopup(Object.assign({ myPluginDirectory }, config));
                        });
                        // __non_webpack_require__(
                        //   path.resolve(myPluginDirectory, plugins[config.name].mainProcess)
                        // ).default(id);
                    }
                    catch (e) {
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
    });
}
