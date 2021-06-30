/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 2:57:11 am
 * @copyright TechnomancyIT
 */
import { ipcMain } from 'electron';
import { sequelize } from '../libs/database';
import { deleteConfig } from '../libs/configurator';

export const configuratorDelete = ipcMain.handle(
  'configurator-delete',
  async (event, opts) => {
    deleteConfig(opts.name, opts.values);
  }
);
