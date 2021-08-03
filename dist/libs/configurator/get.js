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
 * @desc Created on 2021-06-29 5:16:35 pm
 * @copyright TechnomancyIT
 */
import log from 'electron-log';
import isRenderer from 'is-electron-renderer';
import { ipcRenderer } from 'electron';
import Setting from '../../models/Setting';
export function getConfig(type, name, values) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isRenderer) {
            const settings = yield Setting.findOne({
                attributes: { include: ['values'] },
                where: { type, name },
            }).catch((e) => {
                log.error(e);
            });
            if (!settings)
                return undefined;
            const foundValues = settings === null || settings === void 0 ? void 0 : settings.values;
            let valueObject = {};
            if (Array.isArray(values))
                values.map((value) => {
                    valueObject[value] = foundValues[value];
                });
            else
                valueObject = foundValues[values];
            return valueObject;
        }
        return ipcRenderer.invoke('configurator-get', { type, name, values });
    });
}
