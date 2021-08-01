/**
 * @author Chad Koslovsky
 * @email Chad@BioFi.Tech
 * @create date 2021-05-26 14:43:08
 * @modify date 2021-05-28 23:42:08
 * @desc [description]
 */
import { Sequelize } from 'sequelize-typescript';
import path from 'path';

import eLogger from 'electron-log';

//Local
import Setting from '../models/Setting';
import Plugin from '../models/Plugin';

import dbSetup from '../config/databaseSetup';

export const Models = {};

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

// sequelize.models.Setting.hasOne(sequelize.models.Plugin, {
//   foreignKey: 'pluginId',
// });

//sequelize.addModels([path.join(__dirname, '../', 'models/')]);

export async function waitForModels() {
  await sequelize.sync();
  (global as any).models = sequelize.models;
  // await setup();
  //  require('../authentication/auth');
}

export async function addModels(models: any[]) {
  // console.log('NODE', models);

  const fileModels: any = [];

  models.map((model) => {
    fileModels.push(__non_webpack_require__(model).default);
  });

  sequelize.addModels(fileModels);
  await sequelize.sync();
  (global as any).models = sequelize.models;
}

dbSetup();

export { sequelize, Setting, Plugin };

export async function setRelationship(
  modelName: string,
  relationshipName: string
) {
  const model = sequelize.models[modelName];
  const relationshipModel = sequelize.models[relationshipName];
}
