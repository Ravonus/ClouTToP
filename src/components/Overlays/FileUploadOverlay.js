"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadOverlay = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const { app } = electron_1.remote;
const dir = app.getAppPath();
const FileUploadOverlay = () => {
    console.log(__dirname);
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsx("div", Object.assign({ className: 'w-screen h-screen bg-gray-800 absolute top-0 left-0 flex flex-wrap content-center' }, { children: jsx_runtime_1.jsxs("div", Object.assign({ style: {
                        left: '56%',
                        top: '25%',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                    }, className: 'relative' }, { children: [jsx_runtime_1.jsx("img", { className: 'opacity-100', style: { width: 128, height: 128 }, src: `${path_1.default.join(dir, '../', 'cloutPlugins/ARPaper/src', 'assets/icons/', 'iconmonstr-upload-10.svg')}` }, void 0), jsx_runtime_1.jsx("span", { children: "Create Image Library Item" }, void 0)] }), void 0) }), void 0), jsx_runtime_1.jsx("div", { className: 'w-screen h-screen bg-gray-800 opacity-50 absolute top-0 left-0 z-30' }, void 0)] }, void 0));
};
exports.FileUploadOverlay = FileUploadOverlay;
