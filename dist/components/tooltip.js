import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ToolTip = ({ Element, text }) => {
    return (_jsxs("div", Object.assign({ className: 'relative flex flex-col items-center group' }, { children: [eval(Element), _jsx("svg", { children: _jsx("path", { fillRule: 'evenodd', d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z', clipRule: 'evenodd' }, void 0) }, void 0), _jsxs("div", Object.assign({ className: 'absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex group-hover:bg-primary' }, { children: [_jsx("span", Object.assign({ className: 'relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg' }, { children: text }), void 0), _jsx("div", { className: 'w-3 h-3 -mt-2 rotate-45 bg-black' }, void 0)] }), void 0)] }), void 0));
};
export default ToolTip;
