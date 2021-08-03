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
 * @desc Created on 2021-06-29 5:57:40 pm
 * @copyright TechnomancyIT
 */
import Setting from '../../models/Setting';
import isRenderer from 'is-electron-renderer';
import { ipcRenderer } from 'electron';
export function deleteConfig(name, values) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log('NAME, ', name, 'VALs', values);
        if (!isRenderer) {
            const currentSettings = yield Setting.findOne({ where: { name } });
            const currentValues = currentSettings === null || currentSettings === void 0 ? void 0 : currentSettings.values;
            console.log('VALES', values);
            // switch (typeof currentSettings.values[values]) {
            //   case 'object':
            //     currentSettings.values[values] = {};
            //     break;
            //   default:
            //     delete currentSettings.values[values];
            //     break;
            // }
            if (!currentSettings)
                return { error: 'No object' };
            delete currentSettings.values[values];
            console.log('geeek', (_a = currentSettings.dataValues) === null || _a === void 0 ? void 0 : _a.values);
            //   return await currentSettings.save();
            const s = yield Setting.update({ values: currentSettings.dataValues.values }, {
                where: { name },
            }).catch((e) => {
                error: e;
            });
            console.log(s);
            return s;
        }
        return yield ipcRenderer.invoke('configurator-delete', { name, values });
    });
}
