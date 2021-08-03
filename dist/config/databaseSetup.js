/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 3:29:15 pm
 * @copyright TechnomancyIT
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fR from 'electron-first-run';
import { sequelize } from '../libs/database';
import { createConfig, getConfig } from '../libs/configurator';
import { isDev } from '../ipc';
export default () => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize.sync();
    if (isDev)
        fR.clear();
    const isFirstRun = fR();
    if (!isFirstRun)
        return;
    yield createConfig('application', 'main', { darkmode: true });
    const darkmode = yield getConfig('application', 'main', [
        'darkmode',
        'another',
    ]);
    yield createConfig('application', 'plugins', { list: {} });
    // const updated = await updateConfig('main', {
    //   darkmode: false,
    // });
});
