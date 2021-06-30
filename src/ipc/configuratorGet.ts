/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 2:57:11 am
 * @copyright TechnomancyIT
 */
import { ipcMain } from 'electron';
import { getConfig } from '../libs/configurator';

console.log('I TERD YOU TER we all terd?');

export const configuratorGet = ipcMain.handle(
  'configurator-get',
  async (event, opts) => {
    console.log('I DOZ?? but I DO NOTZ?');
    return getConfig(opts.type, opts.name, opts.values);
  }
);
