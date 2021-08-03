var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ipcRenderer } from 'electron/renderer';
import { useEffect, useState } from 'react';
import { getConfig } from '../../../libs/configurator';
import TopBar from './topBar';
import { GreenButton, RedButton } from '../../../components/buttons/index';
const App = () => {
    const [darkmode, setDarkmode] = useState(false);
    let plugin = useState({});
    let setPlugins;
    [plugin, setPlugins] = useState({});
    useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const dm = yield getConfig('application', 'main', 'darkmode');
            setDarkmode(dm);
        }))();
        ipcRenderer.removeAllListeners('pluginAccept');
        ipcRenderer.removeAllListeners('pushPlugin');
        ipcRenderer.on('pluginAccept', function (evt, dm) {
            setDarkmode(dm);
        });
        ipcRenderer.on('pushPlugin', function (evt, message) {
            console.log(message); // Returns: {'SAVED': 'File Saved'}
            setPlugins(message);
        });
    });
    function darkmodeCheck(value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield setDarkmode(value);
        });
    }
    return (_jsxs("main", Object.assign({ className: `${darkmode ? 'dark bg-gray-700' : 'bg-gray-200'} h-screen` }, { children: [_jsx(TopBar, { darkmode: darkmode, setDarkmode: setDarkmode, darkmodeCheck: darkmodeCheck }, void 0), _jsx("div", Object.assign({ className: 'text-center flex flex-col justify justify-center dark:text-primary dark:bg-gray-700 bg-gray-200' }, { children: _jsxs("div", Object.assign({ className: 'pt-12' }, { children: [_jsxs("span", { children: [plugin.name, " is trying to install is this ok?"] }, void 0), _jsxs("div", Object.assign({ className: 'grid grid-cols-2 gap-4 pt-12 px-4' }, { children: [_jsx(GreenButton, { text: 'Install', onClick: () => {
                                        ipcRenderer.invoke('pluginSetup', Object.assign(Object.assign({}, plugin), { install: true }));
                                    } }, void 0), _jsx(RedButton, { text: 'Remove', onClick: () => {
                                        ipcRenderer.invoke('pluginSetup', Object.assign(Object.assign({}, plugin), { install: false }));
                                    } }, void 0)] }), void 0)] }), void 0) }), void 0)] }), void 0));
};
export default App;
