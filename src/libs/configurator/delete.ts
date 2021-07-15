/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 5:57:40 pm
 * @copyright TechnomancyIT
 */
import Setting from '../../models/Setting';
import isRenderer from 'is-electron-renderer';
import { ipcRenderer } from 'electron';

export async function deleteConfig(name: string, values: any) {
  console.log('NAME, ', name, 'VALs', values);
  if (!isRenderer) {
    const currentSettings: any = await Setting.findOne({ where: { name } });
    const currentValues: any = currentSettings?.values;
    console.log('VALES', values);

    // switch (typeof currentSettings.values[values]) {
    //   case 'object':
    //     currentSettings.values[values] = {};
    //     break;

    //   default:
    //     delete currentSettings.values[values];
    //     break;
    // }

    if (!currentSettings) return { error: 'No object' };
    delete currentSettings.values[values];

    console.log('geeek', currentSettings.dataValues?.values);
    //   return await currentSettings.save();
    const s = await Setting.update(
      { values: currentSettings.dataValues.values },
      {
        where: { name },
      }
    ).catch((e) => {
      error: e;
    });

    console.log(s);

    return s;
  }
  return await ipcRenderer.invoke('configurator-delete', { name, values });
}
