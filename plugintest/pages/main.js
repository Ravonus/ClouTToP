"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
console.log('I RUNS');
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_tooltip_1 = __importDefault(require("react-tooltip"));
// //Database models
const scenes_1 = __importDefault(require("./scenes"));
const library_1 = __importDefault(require("./library"));
const BottomBar_1 = __importDefault(require("../components/BottomBar"));
let firstRun = 0;
const Main = ({ setRoute, setRoutePage, setPage, addPluginMenu, }) => {
    const menu = [
        {
            name: 'plugins_ARPaper_scenes',
            pluginName: 'ARPaper',
            el: (jsx_runtime_1.jsx(react_router_dom_1.NavLink, Object.assign({ onClick: () => setPage(`plugins_ARPaper_scenes`), className: 'navButton', to: 'plugins_ARPaper_scenes', id: 'plugins_ARPaper_scenes' }, { children: jsx_runtime_1.jsxs("div", Object.assign({ "data-tip": 'ARPaper Scenes', className: 'hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer', style: { width: 46, height: 34 } }, { children: [jsx_runtime_1.jsx(react_tooltip_1.default, {}, void 0), jsx_runtime_1.jsx("img", { className: 'ml-3 my-2 relative', style: {
                                width: 24,
                                height: 24,
                                top: 5,
                                filter: 'invert(48%) sepia(29%) saturate(2476%) hue-rotate(190deg) brightness(118%) contrast(119%) drop-shadow(-0.5px -0.5px 0 black) drop-shadow(0.5px 0.5px 0 black)',
                            }, src: '../assets/icons/iconmonstr-computer-2.svg', alt: 'S' }, void 0)] }), void 0) }), void 0)),
        },
        {
            name: 'plugins_ARPaper_library',
            pluginName: 'ARPaper',
            el: (jsx_runtime_1.jsx(react_router_dom_1.NavLink, Object.assign({ onClick: () => setPage(`plugins_ARPaper_library`), className: 'navButton', to: 'plugins_ARPaper_library', id: 'plugins_ARPaper_library' }, { children: jsx_runtime_1.jsxs("div", Object.assign({ "data-tip": 'ARPaper Library', className: 'hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer', style: { width: 46, height: 34 } }, { children: [jsx_runtime_1.jsx(react_tooltip_1.default, {}, void 0), jsx_runtime_1.jsx("img", { className: 'ml-3 my-2 relative', style: {
                                width: 24,
                                height: 24,
                                top: 5,
                                filter: 'invert(48%) sepia(29%) saturate(2476%) hue-rotate(190deg) brightness(118%) contrast(119%) drop-shadow(-0.5px -0.5px 0 black) drop-shadow(0.5px 0.5px 0 black)',
                            }, src: '../assets/icons/iconmonstr-layer-22.svg', alt: 'S' }, void 0)] }), void 0) }), void 0)),
        },
    ];
    react_1.useEffect(() => {
        addPluginMenu(menu[1], 'plugins_ARPaper_library', {
            route: {
                name: 'library',
                path: '/plugins_ARPaper_library',
                component: 'Library',
            },
            component: scenes_1.default,
        });
        addPluginMenu(menu[0], 'plugins_ARPaper_scenes', {
            route: {
                name: 'scenes',
                path: '/plugins_ARPaper_scenes',
                component: 'Scenes',
            },
            component: library_1.default,
        });
        setRoutePage({
            name: 'library',
            path: '/plugins_ARPaper_library',
            component: 'Library',
        }, scenes_1.default);
        setRoutePage({
            name: 'scenes',
            path: '/plugins_ARPaper_scenes',
            component: 'Scenes',
        }, library_1.default);
    }, []);
    return (jsx_runtime_1.jsxs("div", Object.assign({ className: 'text-center l flex flex-col justify justify-center dark:text-primary' }, { children: ["I PLUGIN MAIN WALLPAPERS = \u2764 and no fucking way!z", jsx_runtime_1.jsx(BottomBar_1.default, {}, void 0)] }), void 0));
};
exports.default = Main;
