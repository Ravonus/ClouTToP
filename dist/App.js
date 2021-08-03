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
/**
 * @author Chad Koslovsky
 * @email Chad@biofi.tech
 * @create date 2021-05-08 16:28:16
 * @modify date 2021-05-08 16:33:08
 * @desc [Main React App - This will load all other pages and components]
 * @desc - Heart loading is not required for website to load. Website is packed and statically served and loads very fast
 */
import { HashRouter as Router, Route, NavLink, useHistory, } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
//Pages
import Dashboard from './pages/dashboard';
import Help from './pages/help';
import About from './pages/about';
import Settings from './pages/settings';
import Plugins from './pages/plugins';
//Components
import Menu from './components/sidebar';
import Top from './components/topBar';
//Icons
import PluginsIcon from './assets/icons/iconmonstr-brick-8.svg';
import HelpIcon from './assets/icons/iconmonstr-help-1.svg';
import AboutIcon from './assets/icons/iconmonstr-construction-8.svg';
import DashboardIcon from './assets/icons/iconmonstr-dashboard-4.svg';
import { wait } from './functions';
import { getConfig } from './libs/configurator';
//Import Styles
//import './App.scss';
// const routes = [
//   { name: 'Dashboard', link: '/dashboard', component: 'Dashboard' },
//   { name: 'Help', link: '/help', component: 'Help' },
//   { name: 'About', link: '/about' },
//   { name: 'Settings', link: '/settings' },
//   { name: 'Plugins', link: '/plugins' },
// ];
let routePages = {};
let setRoutePages;
function checkActive() {
    return __awaiter(this, void 0, void 0, function* () {
        const navButtons = document.querySelectorAll('.navButton');
        navButtons.forEach((button) => {
            var _a, _b;
            const classList = button.classList;
            const active = [...classList].includes('active');
            if (active)
                (_a = button
                    .querySelector('div')) === null || _a === void 0 ? void 0 : _a.classList.add('dark:bg-gray-700', 'bg-gray-200', 'border-l-4', 'hover:border-secondary', 'dark:hover:border-primary', 'dark:border-gray-300', 'border-black');
            else
                (_b = button
                    .querySelector('div')) === null || _b === void 0 ? void 0 : _b.classList.remove('dark:bg-gray-700', 'bg-gray-200', 'border-l-4', 'hover:border-secondary', 'dark:hover:border-primary', 'dark:border-gray-300', 'border-black');
        });
    });
}
function waitForNavigation(type, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let pluginButton;
        if (type === 'id')
            pluginButton = document.querySelector(`#${id}`);
        else
            pluginButton = document.querySelectorAll(`.${id}`);
        if (!pluginButton || (type === 'class' && pluginButton.length === 0)) {
            yield wait(50);
            pluginButton = yield waitForNavigation(type, id);
        }
        return pluginButton;
    });
}
let entered = 0;
function App(props) {
    const [darkmode, setDarkmode] = useState(false);
    const [routesLoaded, setRoutesLoaded] = useState(['']);
    const [openPanel, setOpenPanel] = useState(false);
    const [page, setPage] = useState('dashboard');
    const [showFileOverlay, setShowFileOverlay] = useState({ plugins_ARPaper_library: false });
    const [routes, setRoutes] = useState([
        { name: 'Dashboard', link: '/dashboard', component: 'Dashboard' },
        { name: 'Help', link: '/help', component: 'Help' },
        { name: 'About', link: '/about' },
        { name: 'Settings', link: '/settings' },
        { name: 'Plugins', link: '/plugins' },
    ]);
    [routePages, setRoutePages] = useState({
        Dashboard,
        Help,
        About,
        Settings,
        Plugins,
    });
    let history = useHistory();
    function setRoute(value, props) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(props);
            routes.push({
                name: value.name,
                component: value.component,
                link: value.path || value.link,
                props,
            });
            yield setRoutes(routes);
        });
    }
    function setRoutePage(opt, component, props) {
        const name = opt.component;
        if (routesLoaded.includes(name.toLocaleLowerCase())) {
            //  setRoute(opt);
            return;
        }
        else {
            routePages[name] = component;
            setRoutePages(routePages);
            routesLoaded.push(name.toLocaleLowerCase());
            setRoutesLoaded(routesLoaded);
            setRoute(opt, props);
        }
    }
    function sidebarCheck() {
        return __awaiter(this, void 0, void 0, function* () {
            const bmenu = menu;
            yield setMenu({ mainMenu: [], pluginMenu: [] });
            yield wait(50);
            setMenu(bmenu);
        });
    }
    useEffect(() => {
        const dragover = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };
        const dragenter = (event) => {
            if (entered !== 0) {
                console.log(history);
                const loc = history.location.pathname.substring(1);
                showFileOverlay[loc] = true;
                console;
                setShowFileOverlay(showFileOverlay);
            }
            entered = 1;
        };
        const dragleave = (event) => {
            if (entered === 0)
                console.log('File has left the Drop Space');
            else
                entered--;
        };
        const drop = (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (!event.dataTransfer)
                return;
            for (const f of event === null || event === void 0 ? void 0 : event.dataTransfer.files) {
                // Using the path attribute to get absolute file path
                console.log('File Path of dragged files: ', f.path);
            }
        };
        document.removeEventListener('dragover', dragover);
        document.removeEventListener('dragenter', dragenter);
        document.removeEventListener('dragleave', dragleave);
        document.removeEventListener('drag', drop);
        document.addEventListener('dragover', dragover);
        document.addEventListener('dragenter', dragenter);
        document.addEventListener('dragleave', dragleave);
        document.addEventListener('drop', drop);
        (() => __awaiter(this, void 0, void 0, function* () {
            const dm = yield getConfig('application', 'main', 'darkmode');
            setDarkmode(dm);
            if (dm)
                document.body.classList.add('dark');
            const pluginButton = yield waitForNavigation('id', 'PluginsButton');
            pluginButton === null || pluginButton === void 0 ? void 0 : pluginButton.click();
            //TODO: Need a way to not keep waiting if user has no plugins (Would be odd as the app does nothing without plugins)
            const allPluginButtons = yield waitForNavigation('class', 'pluginButton');
            allPluginButtons === null || allPluginButtons === void 0 ? void 0 : allPluginButtons.forEach((el) => {
                el.click();
            });
            const dashboardButton = yield waitForNavigation('id', 'DashboardButton');
            yield wait(100);
            dashboardButton === null || dashboardButton === void 0 ? void 0 : dashboardButton.click();
        }))();
    }, []);
    function mainMenuGenerator(swap) {
        return [
            {
                // routes: ['dashboard', 'help', 'plugins'],
                el: (_jsx(NavLink, Object.assign({ onClick: () => setPage('dashboard'), className: 'navButton', to: '/dashboard' }, { children: _jsxs("div", Object.assign({ id: 'DashboardButton', "data-tip": 'Dashboard', className: 'hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer', style: { width: 46, height: 34 } }, { children: [_jsx(ReactTooltip, {}, void 0), _jsx("img", { className: `filter-${darkmode && !swap
                                    ? 'green'
                                    : darkmode && swap
                                        ? 'blue'
                                        : !darkmode && !swap
                                            ? 'blue'
                                            : 'green'}-shadow ml-3 my-2 relative`, style: { width: 24, height: 24, top: 5 }, src: DashboardIcon, alt: 'P' }, void 0)] }), void 0) }), void 0)),
            },
            {
                el: (_jsx(NavLink, Object.assign({ onClick: () => setPage('plugins'), className: 'navButton', to: '/plugins' }, { children: _jsxs("div", Object.assign({ id: 'PluginsButton', "data-tip": 'Plugins', className: 'hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer', style: { width: 46, height: 34 } }, { children: [_jsx(ReactTooltip, {}, void 0), _jsx("img", { className: `filter-${darkmode && !swap
                                    ? 'green'
                                    : darkmode && swap
                                        ? 'blue'
                                        : !darkmode && !swap
                                            ? 'blue'
                                            : 'green'}-shadow ml-3 my-2 relative`, style: { width: 24, height: 24, top: 5 }, src: PluginsIcon, alt: 'P' }, void 0)] }), void 0) }), void 0)),
            },
            {
                el: (_jsx(NavLink, Object.assign({ onClick: () => setPage('about'), className: 'navButton', to: 'About' }, { children: _jsxs("div", Object.assign({ "data-tip": 'About', className: 'hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer', style: { width: 46, height: 34 } }, { children: [_jsx(ReactTooltip, {}, void 0), _jsx("img", { className: `filter-${darkmode && !swap
                                    ? 'green'
                                    : darkmode && swap
                                        ? 'blue'
                                        : !darkmode && !swap
                                            ? 'blue'
                                            : 'green'}-shadow ml-3 my-2 relative`, style: { width: 24, height: 24, top: 5 }, src: AboutIcon, alt: 'A' }, void 0)] }), void 0) }), void 0)),
            },
            {
                el: (_jsxs(NavLink, Object.assign({ onClick: () => setPage('help'), className: 'navButton', to: '/help' }, { children: [_jsxs("div", Object.assign({ "data-tip": 'Help', className: 'hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer', style: { width: 46, height: 34 } }, { children: [_jsx(ReactTooltip, {}, void 0), _jsx("img", { className: `filter-${darkmode && !swap
                                        ? 'green'
                                        : darkmode && swap
                                            ? 'blue'
                                            : !darkmode && !swap
                                                ? 'blue'
                                                : 'green'}-shadow ml-3 my-2 relative`, style: { width: 24, height: 24, top: 5 }, src: HelpIcon, alt: 'H' }, void 0)] }), void 0), ' '] }), void 0)),
            },
        ];
    }
    const menus = {
        mainMenu: mainMenuGenerator(),
        pluginMenu: [],
    };
    const [menu, setMenu] = useState(menus);
    function darkmodeCheck(value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield setDarkmode(value);
        });
    }
    function addPluginMenu(pluginMenu, id, route) {
        return __awaiter(this, void 0, void 0, function* () {
            let found = false;
            menu.pluginMenu.map((localMenu) => {
                if (localMenu.name === pluginMenu.name)
                    found = true;
            });
            if (found)
                return;
            // menus.pluginMenu.push(pluginMenu);
            if (menu.mainMenu.length > 0) {
                const t = menu;
                t.pluginMenu = [...t.pluginMenu, pluginMenu];
                //  menu.pluginMenu.push(pluginMenu);
                setMenu(t);
            }
            //
            yield wait(15);
            const el = document.querySelector('#DashboardButton');
            if (el)
                el.click();
            yield wait(5);
            const elPlug = document.querySelector('#PluginsButton');
            if (elPlug)
                elPlug.click();
            yield wait(5);
            const el2 = document.querySelector(`#${pluginMenu.pluginName}`);
            if (el2)
                el2.click();
            yield wait(100);
            if (route.route.name === 'library')
                console.log('props', props);
            if (route)
                setRoutePage(route.route, route.component, props);
        });
    }
    useEffect(() => {
        if (darkmode)
            document.body.classList.add('dark');
        else
            document.body.classList.remove('dark');
        setMenu({
            mainMenu: mainMenuGenerator(false),
            pluginMenu: menu.pluginMenu,
        });
    }, [darkmode]);
    useEffect(() => {
        checkActive();
    }, [page]);
    const checkLoadedRoutes = [];
    return (_jsx("div", { children: _jsx("main", Object.assign({ className: `${darkmode ? 'dark' : ''}` }, { children: _jsxs(Router, { children: [_jsx(Top, { setDarkmode: setDarkmode, darkmode: darkmode, darkmodeCheck: darkmodeCheck }, void 0), _jsx(Menu, { darkmode: darkmode, setPage: setPage, navInfo: menu }, void 0), _jsx("button", { style: { position: 'absolute', top: 100, zIndex: 999999 }, onClick: () => setOpenPanel(true) }, void 0), _jsx("div", Object.assign({ className: 'border-transparent group-hover:border-primary border-2' }, { children: _jsx("div", Object.assign({ className: 'flex flex-wrap content-center pt-8 pl-12' }, { children: routes.map((link) => {
                                if (checkLoadedRoutes.includes(link.link))
                                    return;
                                checkLoadedRoutes.push(link.link);
                                const Component = routePages[link.component ? link.component : link.name];
                                return (_jsx(Route, { render: (props) => {
                                        return (_jsx(Component, Object.assign({ script: _jsx("div", { children: link.html }, void 0), checkActive: checkActive, darkmode: darkmode, sidebarCheck: sidebarCheck, setPage: setPage, addPluginMenu: addPluginMenu, setRoute: setRoute, setRoutePage: setRoutePage }, link.props, props), void 0));
                                    }, path: link.link, exact: true }, link.name));
                            }) }), void 0) }), void 0)] }, void 0) }), void 0) }, void 0));
}
export default App;
