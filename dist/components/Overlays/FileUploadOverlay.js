import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import path from 'path';
import { remote } from 'electron';
const { app } = remote;
const dir = app.getAppPath();
export const FileUploadOverlay = () => {
    console.log(__dirname);
    return (_jsxs(_Fragment, { children: [_jsx("div", Object.assign({ className: 'w-screen h-screen bg-gray-800 absolute top-0 left-0 flex flex-wrap content-center' }, { children: _jsxs("div", Object.assign({ style: {
                        left: '56%',
                        top: '25%',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                    }, className: 'relative' }, { children: [_jsx("img", { className: 'opacity-100', style: { width: 128, height: 128 }, src: `${path.join(dir, '../', 'cloutPlugins/ARPaper/src', 'assets/icons/', 'iconmonstr-upload-10.svg')}` }, void 0), _jsx("span", { children: "Create Image Library Item" }, void 0)] }), void 0) }), void 0), _jsx("div", { className: 'w-screen h-screen bg-gray-800 opacity-50 absolute top-0 left-0 z-30' }, void 0)] }, void 0));
};
