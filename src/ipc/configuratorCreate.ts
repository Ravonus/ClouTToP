/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 2:57:11 am
 * @copyright TechnomancyIT
 */
import { ipcMain } from 'electron';
import { sequelize } from '../libs/database';
import {
  getConfig,
  deleteConfig,
  updateConfig,
  createConfig,
} from '../libs/configurator';

export const configuratorCreate = ipcMain.handle(
  'configurator-create',
  async (event, opts) => {
    createConfig(opts.type, opts.name, opts.values);
  }
);
