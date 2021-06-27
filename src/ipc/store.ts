import { ipcMain } from 'electron';
import Store from 'electron-store';

const store = new Store();

ipcMain.on('store', (event, value) => {
  console.log('RAN', value);
});
