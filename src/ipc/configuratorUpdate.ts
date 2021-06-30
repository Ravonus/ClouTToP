/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 2:57:11 am
 * @copyright TechnomancyIT
 */
import { ipcMain } from 'electron';
import { sequelize } from '../libs/database';
import { updateConfig } from '../libs/configurator';

export const configuratorUpdate = ipcMain.handle(
  'configurator-update',
  async (event, opts) => {
    updateConfig(opts.name, opts.values);
  }
);
