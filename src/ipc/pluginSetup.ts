/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 2:57:11 am
 * @copyright TechnomancyIT
 */
import { ipcMain } from 'electron';
import { Plugin, sequelize } from '../libs/database';
import { grabPluginAcceptWindows } from '../windows/pluginAcceptWindow/PluginAccept';
import path from 'path';
import { nanoid } from 'nanoid';
import { mainWindow } from '../main';

export const pluginSetup = ipcMain.handle(
  'pluginSetup',
  async (event, opts) => {
    console.log(opts);
    console.log('WE NEED TO DO THIS NOW');

    if (opts.install) {
      console.log(path.resolve(opts.myPluginDirectory, opts.mainProcess));
      const id = nanoid();

      const plugin = await Plugin.update(
        { ipcId: id, enabled: true },
        { where: { name: opts.name } }
      );

      mainWindow.webContents.send(`pluginInstall-${opts.name}`, opts);
      console.log('WTF', opts.myPluginDirectory, opts.mainProcess);
      __non_webpack_require__(
        path.resolve(opts.myPluginDirectory, opts.mainProcess)
      ).default(id);
    }
    const windows = grabPluginAcceptWindows();
    windows[0].close();
  }
);
