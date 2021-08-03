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
export function createConfig(type, name, values) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isRenderer) {
            return yield Setting.create({ type, name, values }).catch((e) => {
                console.log(e);
                error: e;
            });
        }
        return ipcRenderer.invoke('configurator-create', { type, name, values });
    });
}
