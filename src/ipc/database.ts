/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 2:57:11 am
 * @copyright TechnomancyIT
 */
import { ipcMain } from 'electron';
import { sequelize } from '../libs/database';

export default ipcMain.handle('database', async (event, opts) => {
  const { type, func, value, query, model } = opts;

  const modelFunc: any = sequelize.models[model];
  let lookup;
  if (!type || type === 'read') {
    lookup = await modelFunc[func || 'findAll']({ ...query });
  }

  return lookup;
});
