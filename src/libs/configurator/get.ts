/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 5:16:35 pm
 * @copyright TechnomancyIT
 */
import log from 'electron-log';
import isRenderer from 'is-electron-renderer';
import { ipcRenderer } from 'electron';

import Setting from '../../models/Setting';

export async function getConfig(
  type: 'application' | 'plugin',
  name: string,
  values: string | string[]
) {
  if (!isRenderer) {
    const settings = await Setting.findOne({
      attributes: { include: ['values'] },
      where: { type, name },
    }).catch((e) => {
      log.error(e);
    });

    if (!settings) return undefined;

    const foundValues: any = settings?.values;

    let valueObject: { [key: string]: any } = {};
    if (Array.isArray(values))
      values.map((value) => {
        valueObject[value] = foundValues[value];
      });
    else valueObject = foundValues[values];

    return valueObject;
  }
  return ipcRenderer.invoke('configurator-get', { type, name, values });
}
