var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @author Chad Koslovsky
 * @email Chad@BioFi.Tech
 * @create date 2021-05-26 14:43:08
 * @modify date 2021-05-28 23:42:08
 * @desc [description]
 */
import { Sequelize } from 'sequelize-typescript';
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
export function waitForModels() {
    return __awaiter(this, void 0, void 0, function* () {
        yield sequelize.sync();
        global.models = sequelize.models;
        // await setup();
        //  require('../authentication/auth');
    });
}
export function addModels(models) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log('NODE', models);
        const fileModels = [];
        models.map((model) => {
            fileModels.push(__non_webpack_require__(model).default);
        });
        sequelize.addModels(fileModels);
        yield sequelize.sync();
        global.models = sequelize.models;
    });
}
dbSetup();
export { sequelize, Setting, Plugin };
export function setRelationship(modelName, relationshipName) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = sequelize.models[modelName];
        const relationshipModel = sequelize.models[relationshipName];
    });
}
