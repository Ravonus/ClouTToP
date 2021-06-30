/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 8:35:43 pm
 * @copyright TechnomancyIT
 */
import { ipcMain } from 'electron';

export default ipcMain.on('store', (event, value) => {
  console.log('RAN', value);
});
