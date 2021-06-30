/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 5:57:40 pm
 * @copyright TechnomancyIT
 */
import Setting from '../../models/Setting';
import isRenderer from 'is-electron-renderer';
import { ipcRenderer } from 'electron';

export async function deleteConfig(name: string, values: {}) {
  if (!isRenderer)
    return await Setting.destroy({ where: { name, values } }).catch((e) => {
      error: e;
    });
  return ipcRenderer.invoke('configurator-delete', { name, values });
}
