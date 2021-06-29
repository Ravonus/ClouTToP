import { ipcMain } from 'electron';
import Store from 'electron-store';

const store = new Store();

export default ipcMain.on('store', (event, value) => {
  console.log('RAN', value);
});
