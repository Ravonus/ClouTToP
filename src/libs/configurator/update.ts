/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 5:50:08 pm
 * @copyright TechnomancyIT
 */
import Setting from '../../models/Setting';
import isRenderer from 'is-electron-renderer';
import { ipcRenderer } from 'electron';

export async function updateConfig(name: string, values: any) {
  if (!isRenderer) {
    const currentSettings = await Setting.findOne({ where: { name } });
    const currentValues: any = currentSettings?.values;
    const keys = Object.keys(values);

    keys.map((key: string) => {
      currentValues[key] = values[key];
    });

    return await Setting.update(
      { values: { ...currentValues } },
      { where: { name } }
    ).catch((e) => {
      error: e;
    });
  }
  return ipcRenderer.invoke('configurator-update', { name, values });
}
