/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-28 12:24:27 am
 * @copyright TechnomancyIT
 */
//TODO: I need to make a system that actually generates this file based on plugins that are turned on. (This way typescript can access the files correctly) - Once this is done an API way to grab each of these files as well so you can access them from eachother.
import { ipcRenderer } from 'electron/renderer';
const isDev = ipcRenderer.sendSync('isDev');
let WallpaperPage;
if (isDev) {
    WallpaperPage =
        require('../../../cloutPlugins/ARPaper/src/pages/main').default;
}
const plugins = {};
if (isDev) {
    plugins.ARPaper = WallpaperPage;
}
console.log(plugins);
export default plugins;
//export default {};
