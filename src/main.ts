/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-26 9:16:31 pm
 * @copyright TechnomancyIT
 */

import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';

//Local Modules
import wp from './Wallpaper';
import db from './ipc/database';
import ipc from './libs/node-ipc';
import { loader } from './libs/plugins';
import { wait } from './functions';

//IPC setup
import {
  configuratorCreate,
  configuratorGet,
  configuratorUpdate,
  configuratorDelete,
} from './ipc';
import { loadPlugins } from './libs/compiledPluginLoader';
configuratorCreate;
configuratorGet;
configuratorUpdate;
configuratorDelete;

declare var MAIN_WINDOW_WEBPACK_ENTRY: any;

loader();

db;
ipc;

let firstRun = true;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: any;

const createWindow = () => {
  // Create the browser window.
  let mainWindow: null | BrowserWindow = new BrowserWindow({
    minHeight: 400,
    minWidth: 600,
    frame: false,
    webPreferences: {
      nodeIntegrationInSubFrames: true,
      webviewTag: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      webSecurity: false,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.hide();

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('did-finish-load', function () {
    mainWindow?.show();
    wp();

    if (firstRun)
      loadPlugins(
        'ARPaper',
        path.join(__dirname, '../../cloutPlugins/ARPaper/src/pages/main.js')
      );

    firstRun = false;
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // protocol.registerFileProtocol('public', (request, callback) => {
  //   const url = request.url.substr(7);

  //   callback({ path: path.normalize(`${__dirname}/${url}`) });
  // });
};

app.on('will-finish-launching', () => {
  //  mainWindow?.show();
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// ipcMain.on('test', async (event, someArgument) => {

//   return '';
// });
