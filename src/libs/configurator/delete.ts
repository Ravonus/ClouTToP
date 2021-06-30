/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 6:34:49 pm
 * @copyright TechnomancyIT
 */
import Setting from '../../models/Setting';

export async function deleteConfig(name: string, values: {}) {
  return await Setting.destroy({ where: { name, values } }).catch((e) => {
    error: e;
  });
}
