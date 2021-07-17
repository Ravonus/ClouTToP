/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 2:57:11 am
 * @copyright TechnomancyIT
 */
import { ipcMain } from 'electron';
import {
  PluginAcceptWindow,
  grabPluginAcceptWindows,
} from '../windows/pluginAcceptWindow/PluginAccept';

export const pluginAccept = ipcMain.handle(
  'pluginAccept',
  async (event, dm) => {
    const windows = grabPluginAcceptWindows();
    windows.map((window) => {
      window.webContents.send('pluginAccept', dm);
    });
  }
);
