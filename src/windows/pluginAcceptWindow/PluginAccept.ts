/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-26 10:46:56 pm
 * @copyright TechnomancyIT
 */
import { BrowserWindow, screen, ipcMain } from 'electron';
import path from 'path';
import wallpaper from 'electron-wallpaper-napi';
import globalKeys from 'iohook';
import { wait } from '../../functions';

//Configuration is auto generated by YML script inside craco.config.js

interface WallpaperProps {}

declare var PLUGINACCEPT_WEBPACK_ENTRY: any;
let windows: BrowserWindow[] = [];
export const PluginAcceptWindow = (opts: any) => {
  const window = new BrowserWindow({
    height: 175,
    width: 450,
    webPreferences: {
      nodeIntegrationInSubFrames: true,
      webviewTag: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      webSecurity: false,
    },

    maximizable: false,
    resizable: false,
    // fullscreen: true,
    frame: false,
  });
  windows.push(window);

  //window.setAlwaysOnTop(true, 'torn-off-menu');
  // window.moveTop();
  // window.moveAbove('123')

  window.loadURL(PLUGINACCEPT_WEBPACK_ENTRY);

  //window.webContents.openDevTools();
  window.on('ready-to-show', () => {
    window.webContents.send('pushPlugin', opts);
  });

  if (windows.length > 1) window.hide();

  window.on('close', async () => {
    console.log('CLOSED', windows.length);
    if (windows.length > 0) {
      windows[0].destroy();
      windows.shift();
      await wait(250);
      if (windows.length > 0) windows[0].show();
      console.log(windows.length);
    }
  });
};

export function grabPluginAcceptWindows() {
  return windows;
}

// export function pushPluginMessage() {
//   window?.webContents.send('pushPlugin', { SAVED: 'File Saved' });
// }
