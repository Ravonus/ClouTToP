import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import SettingsIcon from '../assets/icons/iconmonstr-gear-11.svg';
import ReactTooltip from 'react-tooltip';
import { useState } from 'react';
const Menu = ({ navInfo, setPage, darkmode }) => {
    if (!Array.isArray(navInfo.mainMenu))
        navInfo.mainMenu = [navInfo.mainMenu];
    const [dm, setDm] = useState(darkmode);
    useEffect(() => {
        setDm(darkmode);
    }, [darkmode]);
    const history = useHistory();
    return (_jsxs("div", Object.assign({ 
        // onMouseEnter={(event: any) => {
        //   event.target.style.borderColor = darkmode ? 'green' : 'blue';
        // }}
        // onMouseLeave={(event: any) => {
        //   event.target.style.borderColor = darkmode ? 'white' : 'black';
        // }}
        className: 'fixed border-t-2 border-b-2 border-transparent group-hover:border-primary border-l-2 w-12 h-screen bg-gray-300 dark:bg-gray-500 flex justify-center z-50' }, { children: [_jsxs("div", Object.assign({ className: 'grid-flow-col grid-cols-1 grid-rows-1 gap-1' }, { children: [_jsx("div", { className: 'h-10' }, void 0), navInfo.mainMenu.map((nav, i) => {
                        if (nav.routes &&
                            !nav.routes.includes(history.location.pathname.substring(1))) {
                            return null;
                        }
                        return _jsx("div", { children: eval(nav.el) }, `nav-${i}`);
                    }), _jsx("div", Object.assign({ className: 'grid-flow-col grid-cols-1 grid-rows-1 gap-1' }, { children: navInfo.pluginMenu.map((nav, i) => {
                            if (nav.routes &&
                                !nav.routes.includes(history.location.pathname.substring(1))) {
                                return null;
                            }
                            return (_jsxs("div", Object.assign({ className: '' }, { children: [nav.parent ? (_jsxs(_Fragment, { children: [' ', _jsx("div", { className: 'h-4' }, void 0), _jsx("div", { className: 'h-1 border-t border-black dark:border-gray-300' }, void 0)] }, void 0)) : (''), eval(nav.el)] }), `nav-${i}`));
                        }) }), void 0)] }), void 0), _jsx("div", Object.assign({ className: 'grid grid-flow-col grid-cols-1 grid-rows-1 gap-4 absolute bottom-0 left-0' }, { children: _jsxs(NavLink, Object.assign({ className: 'navButton', to: '/settings', onClick: () => {
                        setPage('settings');
                    } }, { children: [_jsxs("div", Object.assign({ "data-tip": 'Settings', className: 'hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer', style: { width: 46, height: 34 } }, { children: [_jsx(ReactTooltip, {}, void 0), _jsx("img", { className: `filter-${dm ? 'green' : 'blue'}-shadow ml-3 my-2 relative`, style: { width: 24, height: 24, top: 5 }, src: SettingsIcon, alt: 'H' }, void 0)] }), void 0), ' '] }), void 0) }), void 0)] }), void 0));
};
export default Menu;
