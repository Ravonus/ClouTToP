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
 * @desc Created on 2021-06-26 10:46:56 pm
 * @copyright TechnomancyIT
 */
import { BrowserWindow } from 'electron';
import { wait } from '../../functions';
let windows = [];
export const PluginAcceptWindow = (opts) => {
    const window = new BrowserWindow({
        height: 175,
        width: 450,
        webPreferences: {
            nodeIntegrationInSubFrames: true,
            webviewTag: true,
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            webSecurity: false,
        },
        maximizable: false,
        resizable: false,
        // fullscreen: true,
        frame: false,
    });
    windows.push(window);
    //window.setAlwaysOnTop(true, 'torn-off-menu');
    // window.moveTop();
    // window.moveAbove('123')
    window.loadURL(PLUGINACCEPT_WEBPACK_ENTRY);
    //window.webContents.openDevTools();
    window.on('ready-to-show', () => {
        window.webContents.send('pushPlugin', opts);
    });
    if (windows.length > 1)
        window.hide();
    window.on('close', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('CLOSED', windows.length);
        if (windows.length > 0) {
            windows[0].destroy();
            windows.shift();
            yield wait(250);
            if (windows.length > 0)
                windows[0].show();
            console.log(windows.length);
        }
    }));
};
export function grabPluginAcceptWindows() {
    return windows;
}
// export function pushPluginMessage() {
//   window?.webContents.send('pushPlugin', { SAVED: 'File Saved' });
// }
