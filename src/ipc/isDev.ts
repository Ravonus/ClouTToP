/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 2:57:11 am
 * @copyright TechnomancyIT
 */
import { ipcMain } from 'electron';
import developmentCheck from 'electron-is-dev';

export const isDev = ipcMain.on('isDev', async (event, opts) => {
  event.returnValue = developmentCheck;
});
