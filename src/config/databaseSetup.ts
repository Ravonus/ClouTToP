/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 3:29:15 pm
 * @copyright TechnomancyIT
 */

import Setting from '../models/Setting';
import fR from 'electron-first-run';
import { sequelize } from '../libs/database';
import { createConfig, getConfig, updateConfig } from '../libs/configurator';

export default async () => {
  await sequelize.sync();
  fR.clear();
  const isFirstRun = fR();
  if (!isFirstRun) return;
  await createConfig('application', 'main', { darkmode: true });
  const darkmode = await getConfig('application', 'main', [
    'darkmode',
    'another',
  ]);

  // const updated = await updateConfig('main', {
  //   darkmode: false,
  // });
};
