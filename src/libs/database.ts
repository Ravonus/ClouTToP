/**
 * @author Chad Koslovsky
 * @email Chad@BioFi.Tech
 * @create date 2021-05-26 14:43:08
 * @modify date 2021-05-28 23:42:08
 * @desc [description]
 */
import { Sequelize } from 'sequelize-typescript';

import eLogger from 'electron-log';

import path from 'path';

//Local
import Setting from '../models/Setting';
import Plugin from '../models/Plugin';

import dbSetup from '../config/databaseSetup';

//import setup from '../setup/db';

//Configuration
// import { configurator } from '../../config/config';
// import { databaseConfig } from './../../config/interfaces';

//const conf: databaseConfig = configurator('database');

const sequelize = new Sequelize('ARScreenz', 'ARUser', 'randompassword', {
  dialect: 'sqlite',
  storage: './db',
  logging: console.log,
});

sequelize.addModels([Setting, Plugin]);

//sequelize.addModels([path.join(__dirname, '../', 'models/')]);

export async function waitForModels() {
  await sequelize.sync();
  // await setup();
  //  require('../authentication/auth');
}

export async function addModels(models: any[]) {
  sequelize.addModels(models);
  await sequelize.sync();
}

dbSetup();

export { sequelize, Setting, Plugin };
