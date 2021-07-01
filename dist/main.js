/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/import-from/index.js":
/*!*******************************************!*\
  !*** ./node_modules/import-from/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const resolveFrom = __webpack_require__(/*! resolve-from */ "./node_modules/resolve-from/index.js");

module.exports = (fromDirectory, moduleId) => require(resolveFrom(fromDirectory, moduleId));

module.exports.silent = (fromDirectory, moduleId) => {
	try {
		return require(resolveFrom(fromDirectory, moduleId));
	} catch (_) {}
};


/***/ }),

/***/ "./node_modules/resolve-from/index.js":
/*!********************************************!*\
  !*** ./node_modules/resolve-from/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const path = __webpack_require__(/*! path */ "path");
const Module = __webpack_require__(/*! module */ "module");
const fs = __webpack_require__(/*! fs */ "fs");

const resolveFrom = (fromDir, moduleId, silent) => {
	if (typeof fromDir !== 'string') {
		throw new TypeError(`Expected \`fromDir\` to be of type \`string\`, got \`${typeof fromDir}\``);
	}

	if (typeof moduleId !== 'string') {
		throw new TypeError(`Expected \`moduleId\` to be of type \`string\`, got \`${typeof moduleId}\``);
	}

	try {
		fromDir = fs.realpathSync(fromDir);
	} catch (err) {
		if (err.code === 'ENOENT') {
			fromDir = path.resolve(fromDir);
		} else if (silent) {
			return null;
		} else {
			throw err;
		}
	}

	const fromFile = path.join(fromDir, 'noop.js');

	const resolveFileName = () => Module._resolveFilename(moduleId, {
		id: fromFile,
		filename: fromFile,
		paths: Module._nodeModulePaths(fromDir)
	});

	if (silent) {
		try {
			return resolveFileName();
		} catch (err) {
			return null;
		}
	}

	return resolveFileName();
};

module.exports = (fromDir, moduleId) => resolveFrom(fromDir, moduleId);
module.exports.silent = (fromDir, moduleId) => resolveFrom(fromDir, moduleId, true);


/***/ }),

/***/ "./src/Wallpaper.ts":
/*!**************************!*\
  !*** ./src/Wallpaper.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var electron_wallpaper_napi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron-wallpaper-napi */ "electron-wallpaper-napi");
/* harmony import */ var electron_wallpaper_napi__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron_wallpaper_napi__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var iohook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! iohook */ "iohook");
/* harmony import */ var iohook__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(iohook__WEBPACK_IMPORTED_MODULE_3__);
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-26 10:46:56 pm
 * @copyright TechnomancyIT
 */




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
    let mainWindow = new electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow({
        webPreferences: {
            nodeIntegrationInSubFrames: true,
            webviewTag: true,
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            webSecurity: false,
        },
        // fullscreen: true,
        type: 'desktop',
        transparent: false,
        frame: false,
    });
    const cdir = path__WEBPACK_IMPORTED_MODULE_1___default().join(__dirname, '../renderer/', 'child/');
    // setTimeout(() => {
    //   child?.loadURL(`file://${cdir}index.html`);
    // }, 20000);
    // let child = new BrowserWindow({
    //   type: 'desktop',
    //   transparent: true,
    //   frame: false,
    //   fullscreen: true,
    //   webPreferences: {
    //     nodeIntegrationInSubFrames: true,
    //     webviewTag: true,
    //     nodeIntegration: true,
    //     enableRemoteModule: true,
    //     contextIsolation: false,
    //     webSecurity: false,
    //   },
    // });
    // child.show();
    mainWindow.setIgnoreMouseEvents(true);
    // mainWindow.webContents.openDevTools();
    electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.on('wpClick', (e, css) => { });
    const dir = path__WEBPACK_IMPORTED_MODULE_1___default().join(__dirname, '../renderer/', 'wallpaper/');
    mainWindow.setKiosk(true);
    // mainWindow.webContents.openDevTools();
    mainWindow.webContents.on('did-navigate', () => {
        setTimeout(() => {
            electron_wallpaper_napi__WEBPACK_IMPORTED_MODULE_2___default().attachWindow(mainWindow);
        }, 100);
    });
    mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.loadURL(`file://${dir}index.html`);
    iohook__WEBPACK_IMPORTED_MODULE_3___default().on('mouseup', (event) => {
        if (event.button === 1)
            mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.send('some-name', electron__WEBPACK_IMPORTED_MODULE_0__.screen.getCursorScreenPoint());
        /* You get object like this
        {
          type: 'mousemove',
          x: 700,
          y: 400
        }
       */
    });
    //Register and start hook
    iohook__WEBPACK_IMPORTED_MODULE_3___default().start(false);
    // setTimeout(() => {
    //   wallpaper.attachWindow(mainWindow);
    // }, 5000);
    //wallpaper.attachWindow(mainWindow);
    // mainWindow?.loadURL(`file://${dir}index.html`);
});


/***/ }),

/***/ "./src/config/databaseSetup.ts":
/*!*************************************!*\
  !*** ./src/config/databaseSetup.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var electron_first_run__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron-first-run */ "electron-first-run");
/* harmony import */ var electron_first_run__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron_first_run__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libs_database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/database */ "./src/libs/database.ts");
/* harmony import */ var _libs_configurator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../libs/configurator */ "./src/libs/configurator/index.ts");
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 3:29:15 pm
 * @copyright TechnomancyIT
 */
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => __awaiter(void 0, void 0, void 0, function* () {
    yield _libs_database__WEBPACK_IMPORTED_MODULE_1__.sequelize.sync();
    electron_first_run__WEBPACK_IMPORTED_MODULE_0___default().clear();
    const isFirstRun = electron_first_run__WEBPACK_IMPORTED_MODULE_0___default()();
    if (!isFirstRun)
        return;
    yield (0,_libs_configurator__WEBPACK_IMPORTED_MODULE_2__.createConfig)('application', 'main', { darkmode: true });
    const darkmode = yield (0,_libs_configurator__WEBPACK_IMPORTED_MODULE_2__.getConfig)('application', 'main', [
        'darkmode',
        'another',
    ]);
    // const updated = await updateConfig('main', {
    //   darkmode: false,
    // });
}));


/***/ }),

/***/ "./src/ipc/configuratorCreate.ts":
/*!***************************************!*\
  !*** ./src/ipc/configuratorCreate.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "configuratorCreate": () => (/* binding */ configuratorCreate)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libs_configurator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/configurator */ "./src/libs/configurator/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 2:57:11 am
 * @copyright TechnomancyIT
 */


const configuratorCreate = electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle('configurator-create', (event, opts) => __awaiter(void 0, void 0, void 0, function* () {
    (0,_libs_configurator__WEBPACK_IMPORTED_MODULE_1__.createConfig)(opts.type, opts.name, opts.values);
}));


/***/ }),

/***/ "./src/ipc/configuratorDelete.ts":
/*!***************************************!*\
  !*** ./src/ipc/configuratorDelete.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "configuratorDelete": () => (/* binding */ configuratorDelete)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libs_configurator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/configurator */ "./src/libs/configurator/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 2:57:11 am
 * @copyright TechnomancyIT
 */


const configuratorDelete = electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle('configurator-delete', (event, opts) => __awaiter(void 0, void 0, void 0, function* () {
    (0,_libs_configurator__WEBPACK_IMPORTED_MODULE_1__.deleteConfig)(opts.name, opts.values);
}));


/***/ }),

/***/ "./src/ipc/configuratorGet.ts":
/*!************************************!*\
  !*** ./src/ipc/configuratorGet.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "configuratorGet": () => (/* binding */ configuratorGet)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libs_configurator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/configurator */ "./src/libs/configurator/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 2:57:11 am
 * @copyright TechnomancyIT
 */


const configuratorGet = electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle('configurator-get', (event, opts) => __awaiter(void 0, void 0, void 0, function* () {
    return (0,_libs_configurator__WEBPACK_IMPORTED_MODULE_1__.getConfig)(opts.type, opts.name, opts.values);
}));


/***/ }),

/***/ "./src/ipc/configuratorUpdate.ts":
/*!***************************************!*\
  !*** ./src/ipc/configuratorUpdate.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "configuratorUpdate": () => (/* binding */ configuratorUpdate)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libs_configurator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/configurator */ "./src/libs/configurator/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 2:57:11 am
 * @copyright TechnomancyIT
 */


const configuratorUpdate = electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle('configurator-update', (event, opts) => __awaiter(void 0, void 0, void 0, function* () {
    (0,_libs_configurator__WEBPACK_IMPORTED_MODULE_1__.updateConfig)(opts.name, opts.values);
}));


/***/ }),

/***/ "./src/ipc/database.ts":
/*!*****************************!*\
  !*** ./src/ipc/database.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libs_database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/database */ "./src/libs/database.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 2:57:11 am
 * @copyright TechnomancyIT
 */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle('database', (event, opts) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, func, value, query, model } = opts;
    const modelFunc = _libs_database__WEBPACK_IMPORTED_MODULE_1__.sequelize.models[model];
    let lookup;
    if (!type || type === 'read') {
        lookup = yield modelFunc[func || 'findAll'](Object.assign({ raw: true }, query));
    }
    if (!lookup)
        return { error: 'Issue with lookup.' };
    return lookup;
})));


/***/ }),

/***/ "./src/ipc/index.ts":
/*!**************************!*\
  !*** ./src/ipc/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "configuratorCreate": () => (/* reexport safe */ _configuratorCreate__WEBPACK_IMPORTED_MODULE_0__.configuratorCreate),
/* harmony export */   "configuratorUpdate": () => (/* reexport safe */ _configuratorUpdate__WEBPACK_IMPORTED_MODULE_1__.configuratorUpdate),
/* harmony export */   "configuratorGet": () => (/* reexport safe */ _configuratorGet__WEBPACK_IMPORTED_MODULE_2__.configuratorGet),
/* harmony export */   "configuratorDelete": () => (/* reexport safe */ _configuratorDelete__WEBPACK_IMPORTED_MODULE_3__.configuratorDelete)
/* harmony export */ });
/* harmony import */ var _configuratorCreate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./configuratorCreate */ "./src/ipc/configuratorCreate.ts");
/* harmony import */ var _configuratorUpdate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./configuratorUpdate */ "./src/ipc/configuratorUpdate.ts");
/* harmony import */ var _configuratorGet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./configuratorGet */ "./src/ipc/configuratorGet.ts");
/* harmony import */ var _configuratorDelete__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./configuratorDelete */ "./src/ipc/configuratorDelete.ts");
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 8:55:38 pm
 * @copyright TechnomancyIT
 */






/***/ }),

/***/ "./src/libs/configurator/create.ts":
/*!*****************************************!*\
  !*** ./src/libs/configurator/create.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createConfig": () => (/* binding */ createConfig)
/* harmony export */ });
/* harmony import */ var _models_Setting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/Setting */ "./src/models/Setting.ts");
/* harmony import */ var is_electron_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! is-electron-renderer */ "is-electron-renderer");
/* harmony import */ var is_electron_renderer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(is_electron_renderer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 5:57:40 pm
 * @copyright TechnomancyIT
 */



function createConfig(type, name, values) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(is_electron_renderer__WEBPACK_IMPORTED_MODULE_1___default())) {
            return yield _models_Setting__WEBPACK_IMPORTED_MODULE_0__.default.create({ type, name, values }).catch((e) => {
                error: e;
            });
        }
        return electron__WEBPACK_IMPORTED_MODULE_2__.ipcRenderer.invoke('configurator-create', { type, name, values });
    });
}


/***/ }),

/***/ "./src/libs/configurator/delete.ts":
/*!*****************************************!*\
  !*** ./src/libs/configurator/delete.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteConfig": () => (/* binding */ deleteConfig)
/* harmony export */ });
/* harmony import */ var _models_Setting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/Setting */ "./src/models/Setting.ts");
/* harmony import */ var is_electron_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! is-electron-renderer */ "is-electron-renderer");
/* harmony import */ var is_electron_renderer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(is_electron_renderer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 5:57:40 pm
 * @copyright TechnomancyIT
 */



function deleteConfig(name, values) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(is_electron_renderer__WEBPACK_IMPORTED_MODULE_1___default()))
            return yield _models_Setting__WEBPACK_IMPORTED_MODULE_0__.default.destroy({ where: { name, values } }).catch((e) => {
                error: e;
            });
        return electron__WEBPACK_IMPORTED_MODULE_2__.ipcRenderer.invoke('configurator-delete', { name, values });
    });
}


/***/ }),

/***/ "./src/libs/configurator/get.ts":
/*!**************************************!*\
  !*** ./src/libs/configurator/get.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getConfig": () => (/* binding */ getConfig)
/* harmony export */ });
/* harmony import */ var electron_log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron-log */ "electron-log");
/* harmony import */ var electron_log__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron_log__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var is_electron_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! is-electron-renderer */ "is-electron-renderer");
/* harmony import */ var is_electron_renderer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(is_electron_renderer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _models_Setting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../models/Setting */ "./src/models/Setting.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 5:16:35 pm
 * @copyright TechnomancyIT
 */




function getConfig(type, name, values) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(is_electron_renderer__WEBPACK_IMPORTED_MODULE_1___default())) {
            const settings = yield _models_Setting__WEBPACK_IMPORTED_MODULE_3__.default.findOne({
                attributes: { include: ['values'] },
                where: { type, name },
            }).catch((e) => {
                electron_log__WEBPACK_IMPORTED_MODULE_0___default().error(e);
            });
            if (!settings)
                return undefined;
            const foundValues = settings === null || settings === void 0 ? void 0 : settings.values;
            let valueObject = {};
            if (Array.isArray(values))
                values.map((value) => {
                    valueObject[value] = foundValues[value];
                });
            else
                valueObject = foundValues[values];
            return valueObject;
        }
        return electron__WEBPACK_IMPORTED_MODULE_2__.ipcRenderer.invoke('configurator-get', { type, name, values });
    });
}


/***/ }),

/***/ "./src/libs/configurator/index.ts":
/*!****************************************!*\
  !*** ./src/libs/configurator/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getConfig": () => (/* reexport safe */ _get__WEBPACK_IMPORTED_MODULE_0__.getConfig),
/* harmony export */   "createConfig": () => (/* reexport safe */ _create__WEBPACK_IMPORTED_MODULE_1__.createConfig),
/* harmony export */   "deleteConfig": () => (/* reexport safe */ _delete__WEBPACK_IMPORTED_MODULE_2__.deleteConfig),
/* harmony export */   "updateConfig": () => (/* reexport safe */ _update__WEBPACK_IMPORTED_MODULE_3__.updateConfig)
/* harmony export */ });
/* harmony import */ var _get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get */ "./src/libs/configurator/get.ts");
/* harmony import */ var _create__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create */ "./src/libs/configurator/create.ts");
/* harmony import */ var _delete__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./delete */ "./src/libs/configurator/delete.ts");
/* harmony import */ var _update__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./update */ "./src/libs/configurator/update.ts");
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 4:31:45 pm
 * @copyright TechnomancyIT
 */






/***/ }),

/***/ "./src/libs/configurator/update.ts":
/*!*****************************************!*\
  !*** ./src/libs/configurator/update.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateConfig": () => (/* binding */ updateConfig)
/* harmony export */ });
/* harmony import */ var _models_Setting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/Setting */ "./src/models/Setting.ts");
/* harmony import */ var is_electron_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! is-electron-renderer */ "is-electron-renderer");
/* harmony import */ var is_electron_renderer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(is_electron_renderer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 5:50:08 pm
 * @copyright TechnomancyIT
 */



function updateConfig(name, values) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(is_electron_renderer__WEBPACK_IMPORTED_MODULE_1___default())) {
            const currentSettings = yield _models_Setting__WEBPACK_IMPORTED_MODULE_0__.default.findOne({ where: { name } });
            const currentValues = currentSettings === null || currentSettings === void 0 ? void 0 : currentSettings.values;
            const keys = Object.keys(values);
            keys.map((key) => {
                currentValues[key] = values[key];
            });
            return yield _models_Setting__WEBPACK_IMPORTED_MODULE_0__.default.update({ values: Object.assign({}, currentValues) }, { where: { name } }).catch((e) => {
                error: e;
            });
        }
        return electron__WEBPACK_IMPORTED_MODULE_2__.ipcRenderer.invoke('configurator-update', { name, values });
    });
}


/***/ }),

/***/ "./src/libs/database.ts":
/*!******************************!*\
  !*** ./src/libs/database.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "waitForModels": () => (/* binding */ waitForModels),
/* harmony export */   "addModels": () => (/* binding */ addModels),
/* harmony export */   "sequelize": () => (/* binding */ sequelize)
/* harmony export */ });
/* harmony import */ var sequelize_typescript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
/* harmony import */ var sequelize_typescript__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize_typescript__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_Setting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/Setting */ "./src/models/Setting.ts");
/* harmony import */ var _config_databaseSetup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config/databaseSetup */ "./src/config/databaseSetup.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @author Chad Koslovsky
 * @email Chad@BioFi.Tech
 * @create date 2021-05-26 14:43:08
 * @modify date 2021-05-28 23:42:08
 * @desc [description]
 */

//Local


//import setup from '../setup/db';
//Configuration
// import { configurator } from '../../config/config';
// import { databaseConfig } from './../../config/interfaces';
//const conf: databaseConfig = configurator('database');
const sequelize = new sequelize_typescript__WEBPACK_IMPORTED_MODULE_0__.Sequelize('ARScreenz', 'ARUser', 'randompassword', {
    dialect: 'sqlite',
    storage: './db',
    logging: console.log,
});
sequelize.addModels([_models_Setting__WEBPACK_IMPORTED_MODULE_1__.default]);
//sequelize.addModels([path.join(__dirname, '../', 'models/')]);
function waitForModels() {
    return __awaiter(this, void 0, void 0, function* () {
        yield sequelize.sync();
        // await setup();
        //  require('../authentication/auth');
    });
}
function addModels(models) {
    return __awaiter(this, void 0, void 0, function* () {
        sequelize.addModels(models);
        yield sequelize.sync();
    });
}
(0,_config_databaseSetup__WEBPACK_IMPORTED_MODULE_2__.default)();



/***/ }),

/***/ "./src/libs/node-ipc.ts":
/*!******************************!*\
  !*** ./src/libs/node-ipc.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var node_ipc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node-ipc */ "node-ipc");
/* harmony import */ var node_ipc__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_ipc__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./database */ "./src/libs/database.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 11:57:47 pm
 * @copyright TechnomancyIT
 */


(node_ipc__WEBPACK_IMPORTED_MODULE_0___default().config.id) = 'Clout';
(node_ipc__WEBPACK_IMPORTED_MODULE_0___default().config.retry) = 1500;
(node_ipc__WEBPACK_IMPORTED_MODULE_0___default().config.silent) = true;
node_ipc__WEBPACK_IMPORTED_MODULE_0___default().serve(function () {
    node_ipc__WEBPACK_IMPORTED_MODULE_0___default().server.on('api', function (data, socket, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('MY DATA', data);
            let doc;
            if (data.type === 'addModel')
                yield (0,_database__WEBPACK_IMPORTED_MODULE_1__.addModels)([data.models]);
            if (data.type === 'database') {
                const model = _database__WEBPACK_IMPORTED_MODULE_1__.sequelize.models[data.table];
                doc = yield model[data.method](data.values).catch((e) => {
                    console.log('WTFD', e);
                });
            }
            serverEmit(socket, { doc, type: data.type, emitterId: data.emitterId });
        });
    });
    node_ipc__WEBPACK_IMPORTED_MODULE_0___default().server.on('socket.disconnected', function (socket, destroyedSocketID) {
        node_ipc__WEBPACK_IMPORTED_MODULE_0___default().log('client ' + destroyedSocketID + ' has disconnected!');
    });
});
node_ipc__WEBPACK_IMPORTED_MODULE_0___default().server.start();
function serverEmit(socket, data) {
    node_ipc__WEBPACK_IMPORTED_MODULE_0___default().server.emit(socket, 'api', data);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((node_ipc__WEBPACK_IMPORTED_MODULE_0___default()));


/***/ }),

/***/ "./src/libs/plugins.ts":
/*!*****************************!*\
  !*** ./src/libs/plugins.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loader": () => (/* binding */ loader)
/* harmony export */ });
/* harmony import */ var electron_log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron-log */ "electron-log");
/* harmony import */ var electron_log__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron_log__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _configurator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./configurator */ "./src/libs/configurator/index.ts");
/* harmony import */ var import_lazy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! import-lazy */ "import-lazy");
/* harmony import */ var import_lazy__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(import_lazy__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var require_from_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! require-from-string */ "require-from-string");
/* harmony import */ var require_from_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(require_from_string__WEBPACK_IMPORTED_MODULE_5__);
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-26 9:17:34 pm
 * @copyright TechnomancyIT
 */
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const importFrom = __webpack_require__(/*! import-from */ "./node_modules/import-from/index.js");

// import pluginsMainProcess from './pluginMainImporter';
// const pluginMain: any = pluginsMainProcess;
// .map((fileList) => fileList.substr(0, fileList.length - 3));
function loader() {
    return __awaiter(this, void 0, void 0, function* () {
        const pluginLocation = yield (0,_configurator__WEBPACK_IMPORTED_MODULE_3__.getConfig)('application', 'plugins', 'pluginLocation');
        const pluginDirectory = path__WEBPACK_IMPORTED_MODULE_1___default().join(__dirname, '../../../', 'cloutPlugins');
        const pluginFileList = fs__WEBPACK_IMPORTED_MODULE_2___default().readdirSync(pluginDirectory);
        //Developer option to delete store to test.
        (0,_configurator__WEBPACK_IMPORTED_MODULE_3__.deleteConfig)('plugins', 'pluginLocation');
        (0,_configurator__WEBPACK_IMPORTED_MODULE_3__.deleteConfig)('plugins', 'list');
        electron_log__WEBPACK_IMPORTED_MODULE_0___default().info('Plugin loader started');
        let plugins;
        try {
            plugins = [...(yield (0,_configurator__WEBPACK_IMPORTED_MODULE_3__.getConfig)('application', 'plugins', 'list'))];
        }
        catch (e) {
            plugins = [];
        }
        plugins.map((plugin) => {
            const index = pluginFileList.indexOf(plugin);
            if (index > -1) {
                pluginFileList.splice(index, 1);
            }
        });
        if (pluginFileList.length > 0) {
            let plugins = {};
            pluginFileList.map((plugin) => {
                electron_log__WEBPACK_IMPORTED_MODULE_0___default().info(`${plugin} is loading for the first time`);
                let myPluginDirecotry = `${pluginDirectory}/${plugin}`;
                electron_log__WEBPACK_IMPORTED_MODULE_0___default().info('PLGS', myPluginDirecotry);
                let config;
                try {
                    config = fs__WEBPACK_IMPORTED_MODULE_2___default().readFileSync(`${myPluginDirecotry}/config.json`, 'utf-8');
                }
                catch (e) { }
                if (config) {
                    console.log('ITS THIS');
                    config = JSON.parse(config);
                    plugins[config.name] = Object.assign(Object.assign({}, config), { path: myPluginDirecotry });
                }
                else
                    electron_log__WEBPACK_IMPORTED_MODULE_0___default().error(`Could not find plugin configuration file for ${plugin}.`);
                console.log(plugins[config.name]);
                if (plugins[config.name].mainProcess) {
                    console.log('RANz', `${myPluginDirecotry}/${plugins[config.name].mainProcess}`);
                    // importFrom(
                    //   path.resolve(myPluginDirecotry),
                    //   plugins[config.name].mainProcess
                    // );
                    let file = fs__WEBPACK_IMPORTED_MODULE_2___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_1___default().resolve(myPluginDirecotry, plugins[config.name].mainProcess), 'utf-8');
                    // importLazy(
                    //   require(path.resolve(
                    //     myPluginDirecotry,
                    //     plugins[config.name].mainProcess
                    //   ))()
                    // );
                    import_lazy__WEBPACK_IMPORTED_MODULE_4___default()(require_from_string__WEBPACK_IMPORTED_MODULE_5___default()(file));
                }
            });
            Object.keys(plugins).map((key) => {
                const plugin = plugins[key];
                if (plugin.mainProcess) {
                    //   pluginMain[plugin.mainProcess];
                    // let file = fs.readFileSync(
                    //   path.resolve(`${plugin.path}/${plugin.mainProcess}`),
                    //   'utf-8'
                    // );
                    // // file.replace(/require\([^)]+/g, '')
                    // const matches = file.match(/require\([^)]+/g);
                    // matches?.forEach((match) => {
                    //   file = file.replace(
                    //     /require\([^)]+/g,
                    //     match.replace('__dirname', plugin.path.replace(/\\/g, '/'))
                    //   );
                    // });
                    // importFrom(`${myPluginDirecotry}/${plugin.mainProcess}`);
                    //     require(`${myPluginDirecotry}/${plugin.mainProcess}`);
                    // require(path.resolve(`${plugin.path}/${plugin.mainProcess}`));
                    try {
                        //   requireFromString(file);
                    }
                    catch (e) { }
                }
            });
            (0,_configurator__WEBPACK_IMPORTED_MODULE_3__.createConfig)('application', 'plugins', { list: plugins });
        }
    });
}


/***/ }),

/***/ "./src/models/Setting.ts":
/*!*******************************!*\
  !*** ./src/models/Setting.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var sequelize_typescript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
/* harmony import */ var sequelize_typescript__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize_typescript__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * @author Chad Koslovsky
 * @email Chad@technomancy.it
 * @create date 2021-05-25 00:12:45
 * @modify date 2021-05-29 05:05:22
 * @desc [ Setting sqlite3 model. This extends the Setting Table into a functional class throughout the application. Just include this file within a script and it will let you know all functionality you have via the database with this table.
 *        You will see the @Table class has all your Column info inside of it. You can set Hooks and Prototypes on the Acutal Setting Class or Setting Instance you pull. The model will always be attached to sequalize.models.
 *        Remeber Database functionality MUST happen in backend process only. ]
 * @return {Model Instance} This return the Setting Instance. You may Create/Delete/Update/Find Settings from sqlite3.
 */

let Setting = class Setting extends sequelize_typescript__WEBPACK_IMPORTED_MODULE_0__.Model {
};
__decorate([
    (0,sequelize_typescript__WEBPACK_IMPORTED_MODULE_0__.AllowNull)(false),
    (0,sequelize_typescript__WEBPACK_IMPORTED_MODULE_0__.Column)({ type: sequelize_typescript__WEBPACK_IMPORTED_MODULE_0__.DataType.TEXT }),
    __metadata("design:type", String)
], Setting.prototype, "type", void 0);
__decorate([
    (0,sequelize_typescript__WEBPACK_IMPORTED_MODULE_0__.AllowNull)(false),
    (0,sequelize_typescript__WEBPACK_IMPORTED_MODULE_0__.Unique)(true),
    (0,sequelize_typescript__WEBPACK_IMPORTED_MODULE_0__.Column)({ type: sequelize_typescript__WEBPACK_IMPORTED_MODULE_0__.DataType.JSONB }),
    __metadata("design:type", String)
], Setting.prototype, "name", void 0);
__decorate([
    (0,sequelize_typescript__WEBPACK_IMPORTED_MODULE_0__.AllowNull)(false),
    (0,sequelize_typescript__WEBPACK_IMPORTED_MODULE_0__.Column)({ type: sequelize_typescript__WEBPACK_IMPORTED_MODULE_0__.DataType.JSONB }),
    __metadata("design:type", String)
], Setting.prototype, "values", void 0);
Setting = __decorate([
    (0,sequelize_typescript__WEBPACK_IMPORTED_MODULE_0__.Table)({ timestamps: true })
], Setting);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Setting);


/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");;

/***/ }),

/***/ "electron-first-run":
/*!*************************************!*\
  !*** external "electron-first-run" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("electron-first-run");;

/***/ }),

/***/ "electron-log":
/*!*******************************!*\
  !*** external "electron-log" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("electron-log");;

/***/ }),

/***/ "electron-squirrel-startup":
/*!********************************************!*\
  !*** external "electron-squirrel-startup" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("electron-squirrel-startup");;

/***/ }),

/***/ "electron-wallpaper-napi":
/*!******************************************!*\
  !*** external "electron-wallpaper-napi" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("electron-wallpaper-napi");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");;

/***/ }),

/***/ "import-lazy":
/*!******************************!*\
  !*** external "import-lazy" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("import-lazy");;

/***/ }),

/***/ "iohook":
/*!*************************!*\
  !*** external "iohook" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("iohook");;

/***/ }),

/***/ "is-electron-renderer":
/*!***************************************!*\
  !*** external "is-electron-renderer" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("is-electron-renderer");;

/***/ }),

/***/ "module":
/*!*************************!*\
  !*** external "module" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("module");;

/***/ }),

/***/ "node-ipc":
/*!***************************!*\
  !*** external "node-ipc" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("node-ipc");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");;

/***/ }),

/***/ "require-from-string":
/*!**************************************!*\
  !*** external "require-from-string" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("require-from-string");;

/***/ }),

/***/ "sequelize-typescript":
/*!***************************************!*\
  !*** external "sequelize-typescript" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("sequelize-typescript");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Wallpaper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Wallpaper */ "./src/Wallpaper.ts");
/* harmony import */ var _ipc_database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ipc/database */ "./src/ipc/database.ts");
/* harmony import */ var _libs_node_ipc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./libs/node-ipc */ "./src/libs/node-ipc.ts");
/* harmony import */ var _libs_plugins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./libs/plugins */ "./src/libs/plugins.ts");
/* harmony import */ var _ipc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ipc */ "./src/ipc/index.ts");
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-26 9:16:31 pm
 * @copyright TechnomancyIT
 */

//Local Modules




//IPC setup

_ipc__WEBPACK_IMPORTED_MODULE_5__.configuratorCreate;
_ipc__WEBPACK_IMPORTED_MODULE_5__.configuratorGet;
_ipc__WEBPACK_IMPORTED_MODULE_5__.configuratorUpdate;
_ipc__WEBPACK_IMPORTED_MODULE_5__.configuratorDelete;
(0,_libs_plugins__WEBPACK_IMPORTED_MODULE_4__.loader)();
_ipc_database__WEBPACK_IMPORTED_MODULE_2__.default;
_libs_node_ipc__WEBPACK_IMPORTED_MODULE_3__.default;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (__webpack_require__(/*! electron-squirrel-startup */ "electron-squirrel-startup")) {
    // eslint-disable-line global-require
    electron__WEBPACK_IMPORTED_MODULE_0__.app.quit();
}
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
const createWindow = () => {
    // Create the browser window.
    let mainWindow = new electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow({
        minHeight: 400,
        minWidth: 600,
        frame: false,
        webPreferences: {
            nodeIntegrationInSubFrames: true,
            webviewTag: true,
            nodeIntegration: true,
            enableRemoteModule: true,
            //webSecurity: false,
            contextIsolation: false,
        },
    });
    mainWindow.loadURL('http://localhost:3000/main_window');
    mainWindow.hide();
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    mainWindow.webContents.on('did-finish-load', function () {
        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.show();
        (0,_Wallpaper__WEBPACK_IMPORTED_MODULE_1__.default)();
    });
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};
electron__WEBPACK_IMPORTED_MODULE_0__.app.on('will-finish-launching', () => {
    //  mainWindow?.show();
});
electron__WEBPACK_IMPORTED_MODULE_0__.app.on('ready', createWindow);
electron__WEBPACK_IMPORTED_MODULE_0__.app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        electron__WEBPACK_IMPORTED_MODULE_0__.app.quit();
    }
});
electron__WEBPACK_IMPORTED_MODULE_0__.app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
// ipcMain.on('test', async (event, someArgument) => {
//   console.log(someArgument);
//   return '';
// });

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=main.js.map