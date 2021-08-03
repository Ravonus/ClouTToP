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
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 2:57:11 am
 * @copyright TechnomancyIT
 */
import { ipcMain } from 'electron';
import { sequelize } from '../libs/database';
export default ipcMain.handle('database', (event, opts) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, func, value, query, model } = opts;
    const modelFunc = sequelize.models[model];
    let lookup;
    if (!type || type === 'read') {
        lookup = yield modelFunc[func || 'findAll'](Object.assign({ raw: true }, query));
    }
    if (!lookup)
        return { error: 'Issue with lookup.' };
    return lookup;
}));
