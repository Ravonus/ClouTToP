var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 2:57:11 am
 * @copyright TechnomancyIT
 */
import { ipcMain } from 'electron';
import { Plugin } from '../libs/database';
import { grabPluginAcceptWindows } from '../windows/pluginAcceptWindow/PluginAccept';
import path from 'path';
import { nanoid } from 'nanoid';
import { mainWindow } from '../main';
import { loadPlugins } from '../libs/compiledPluginLoader';
export const pluginSetup = ipcMain.handle('pluginSetup', (event, opts) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(opts);
    console.log('WE NEED TO DO THIS NOW');
    if (opts.install) {
        console.log(path.resolve(opts.myPluginDirectory, opts.mainProcess));
        const id = nanoid();
        const plugin = yield Plugin.update({ ipcId: id, enabled: true }, { where: { name: opts.name } });
        mainWindow.webContents.send(`pluginInstall-${opts.name}`, opts);
        console.log('ERK', path.join(`${opts.myPluginDirectory}/${opts.fileName}`));
        loadPlugins(opts.name, path.join(`${opts.myPluginDirectory}/${opts.fileName}`));
        __non_webpack_require__(path.resolve(opts.myPluginDirectory, opts.mainProcess)).default(id);
    }
    const windows = grabPluginAcceptWindows();
    windows[0].close();
}));
