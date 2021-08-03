import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//TODO: Add Settings to active side nav check.
import { useState } from 'react';
import { remote } from 'electron';
import Close from '../../../assets/icons/iconmonstr-x-mark-8.svg';
import Minimize from '../../../assets/icons/iconmonstr-minus-thin.svg';
import { updateConfig } from '../../../libs/configurator';
const { BrowserWindow } = remote;
let firstRun = true;
const TopBar = ({ darkmodeCheck, darkmode, setDarkmode }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const navButtons = document.querySelectorAll('.navButton');
    navButtons.forEach((button) => {
        var _a, _b;
        const active = button.classList[1];
        if (active)
            (_a = button
                .querySelector('div')) === null || _a === void 0 ? void 0 : _a.classList.add('dark:bg-gray-700', 'bg-gray-200', 'border-l-200', 'dark:border-white', 'border-black');
        else
            (_b = button
                .querySelector('div')) === null || _b === void 0 ? void 0 : _b.classList.remove('dark:bg-gray-700', 'bg-gray-200', 'border-l-2', 'dark:border-white', 'border-black');
    });
    window.addEventListener('resize', function (event) {
        let element = document.querySelector('#darkmode > div');
        var rect = element === null || element === void 0 ? void 0 : element.getBoundingClientRect();
        if (rect)
            setWidth(rect.right - 43);
    });
    return (_jsxs("div", Object.assign({ className: 'flex flex-wrap content-end' }, { children: [_jsx("div", { className: 'fixed border-t-2 border-r-2 border-transparent group-hover:border-primary group-focus:border-red-primary w-screen h-9 bg-gray-200 dark:bg-gray-700' }, void 0), _jsx("div", { className: 'draggable fixed w-screen h-10 bg-transparent', style: {
                    width,
                } }, void 0), _jsx("div", Object.assign({ onClick: () => { var _a; return (_a = BrowserWindow.getFocusedWindow()) === null || _a === void 0 ? void 0 : _a.close(); }, className: 'cursor-pointer hover:bg-red-500 dark:hover:bg-red-700 fixed top-0 right-0 text-center p-2 px-3' }, { children: _jsx("span", Object.assign({ className: 'color-gray-900 dark:color-gray-200 cursor-pointer text-center' }, { children: _jsx("img", { className: `filter-${darkmode ? 'green' : 'blue'}`, style: { width: 18, height: 18 }, src: Close, alt: 'X' }, void 0) }), void 0) }), void 0), _jsx("div", Object.assign({ onClick: () => { var _a; return (_a = BrowserWindow.getFocusedWindow()) === null || _a === void 0 ? void 0 : _a.minimize(); }, className: 'cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 fixed top-0 right-10 text-center p-2 px-3' }, { children: _jsx("span", Object.assign({ className: 'cursor-pointer text-center' }, { children: _jsx("img", { className: `filter-${darkmode ? 'green' : 'blue'}`, style: { width: 18, height: 18 }, src: Minimize, alt: '--' }, void 0) }), void 0) }), void 0), _jsx("div", { id: 'darkmode', onClick: () => {
                    const dm = darkmode ? false : true;
                    setDarkmode(dm);
                    updateConfig('main', { darkmode: dm });
                    darkmodeCheck(dm);
                } }, void 0)] }), void 0));
};
export default TopBar;
