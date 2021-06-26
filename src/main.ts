import { app, BrowserWindow, ipcMain } from 'electron';
import wallpaper from 'electron-wallpaper-napi';
import mouseFix from 'electron-transparency-mouse-fix';

import wp from './Wallpaper';

declare var MAIN_WINDOW_WEBPACK_ENTRY: any;

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
    webPreferences: {
      nodeIntegrationInSubFrames: true,
      webviewTag: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
  // mainWindow.setKiosk(true);
  // // Open the DevTools.
  // // mainWindow.webContents.openDevTools();
  // wallpaper.attachWindow(mainWindow);
  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // let wallpaperWindow: null | BrowserWindow = new BrowserWindow({
  //   webPreferences: {
  //     nodeIntegrationInSubFrames: true,
  //     webviewTag: true,
  //     nodeIntegration: true,
  //     enableRemoteModule: true,
  //     contextIsolation: false,
  //   },
  //   // fullscreen: true,
  //   type: 'desktop',
  //   transparent: true,
  //   frame: false,
  // });
  wp();
  // wallpaperWindow.loadURL(`file://${__dirname}/wallpaper.html`);
  // wallpaperWindow.setKiosk(true);
  // console.log('RANZA', wallpaperWindow);
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
  // wallpaper.attachWindow(wallpaperWindow);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
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

// ipcMain.handle('some-name', async (event, someArgument) => {
//   console.log(someArgument);
//   return '';
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
