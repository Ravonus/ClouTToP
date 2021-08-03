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
import path from 'path';
import ReactTooltip from 'react-tooltip';
import { remote } from 'electron';
import fs from 'fs';
import { NavLink, useHistory, } from 'react-router-dom';
import { useState } from 'react';
import { getConfig } from '../libs/configurator';
import Card from '../components/cards/PluginCard';
import pluginImporter from '../libs/pluginImporter';
import log from 'electron-log';
//Icons
import WarningIcon from '../assets/icons/iconmonstr-warning-10.svg';
import { useEffect } from 'react';
import { ipcRenderer } from 'electron/renderer';
global.__non_webpack_import__ = remote.require;
// const ffmpeg = __non_webpack_require__(
//   path.join(
//     remote.app.getAppPath(),
//     '/.webpack/renderer/public/pluginImporter.js'
//   )
// );
let terds;
let file;
try {
    // file = fs.readFileSync(
    //   path.resolve(`${remote.app.getAppPath()}/.webpack/renderer/public/terd.ts`),
    //   'utf-8'
    // );
    // requireFromString(file);
}
catch (e) {
    // console.log(e);
}
// terds = requireFromString(file);
const plugins = pluginImporter;
const pluginList = {};
const pluginKeys = Object.keys(plugins);
pluginKeys.map((key) => {
    pluginList[key] = plugins[key];
});
let firstRun = true;
const Plugins = ({ setRoute, setRoutePage, sidebarCheck, addPluginMenu, setPage, }) => {
    let plugins;
    let setPlugins;
    [plugins, setPlugins] = useState({});
    const history = useHistory();
    useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const foundPluginsOpts = yield getConfig('application', 'plugins', 'list');
            const foundPluginDocs = yield ipcRenderer.invoke('database', {
                model: 'Plugin',
            });
            console.log('MY DOCS', foundPluginDocs, foundPluginsOpts);
            foundPluginDocs.map((plugin) => {
                if (foundPluginsOpts[plugin.name])
                    foundPluginsOpts[plugin.name] = Object.assign(Object.assign({}, foundPluginsOpts[plugin.name]), plugin);
            });
            if (foundPluginsOpts)
                setPlugins(foundPluginsOpts);
        }))();
    }, []);
    useEffect(() => {
        if (!firstRun)
            return;
        console.log('EEEKA', plugins);
        Object.keys(plugins).map((key) => {
            console.log(pluginKeys, key);
            if (!pluginKeys.includes(key))
                return;
            const opt = plugins[key];
            function installer(evt, message) {
                const newPlugins = plugins;
                setPlugins({});
                newPlugins[message.name].enabled = true;
                newPlugins[message.name].registered = true;
                newPlugins[message.name].firstRun = false;
                setPlugins(newPlugins);
            }
            ipcRenderer.removeListener(`pluginInstall-${key}`, installer);
            ipcRenderer.once(`pluginInstall-${key}`, installer);
            if (!opt.enabled)
                return;
            let logo;
            if (opt.logo) {
                const logoPath = path.resolve(`${opt.path}/assets${opt.logo}`);
                logo = fs.readFileSync(logoPath, { encoding: 'base64' });
            }
            let menu = {
                name: opt.name,
                parent: true,
                routes: opt.routes,
                el: (_jsxs(NavLink, Object.assign({ id: opt.name, onClick: () => setPage(`plugins_${opt.name}`), className: 'navButton pluginButton', to: `plugins_${opt.name}` }, { children: [_jsxs("div", Object.assign({ "data-tip": opt.name, className: 'hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer', style: { width: 46, height: 34 } }, { children: [_jsx(ReactTooltip, {}, void 0), _jsx("img", { className: 'ml-3 my-2 relative', style: Object.assign({ width: 24, height: 24, top: 5 }, opt.style), src: logo ? `data:image/png;base64, ${logo}` : WarningIcon, alt: 'W' }, void 0)] }), void 0), ' '] }), void 0)),
            };
            // opt.icons.map(() => {
            // })
            // addPluginMenu(menu);
            setTimeout(() => {
                addPluginMenu(menu);
                setRoutePage(opt, pluginList[opt.component]);
                //   setRoute(opt);
                const el = document.querySelector('#DashboardButton');
                if (el)
                    el.click();
                const elp = document.querySelector('#PluginsButton');
                if (elp)
                    elp.click();
                // history.push('#/dashboard');
                // history.push('#/plugins');
            }, 50);
            // const el: any = document.querySelector('#DashboardButton');
            // if (el) el.click();
            // const elp: any = document.querySelector('#PluginsButton');
            // if (elp) elp.click();
            // history.push('#/dashboard');
            // history.push('#/plugins');
            try {
                const config = JSON.parse(fs.readFileSync(`${opt.path}/config.json`, 'utf-8'));
            }
            catch (e) {
                log.error(`Error with configuration file for plugin ${opt.name}`);
            }
            opt.path = `/plugins_${opt.name}`;
            //
            firstRun = false;
        });
    }, [plugins]);
    return (_jsx("div", Object.assign({ className: 'container grid grid-cols-3 gap-4' }, { children: Object.keys(plugins).map((key) => {
            const opt = plugins[key];
            return (_jsx("div", { children: _jsx(Card, { sidebarCheck: sidebarCheck, opt: opt }, void 0) }, `plugin-${opt.name}`));
        }) }), void 0));
};
export default Plugins;
