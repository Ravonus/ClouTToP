"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfig = void 0;
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 5:57:40 pm
 * @copyright TechnomancyIT
 */
const Setting_1 = __importDefault(require("../../models/Setting"));
const is_electron_renderer_1 = __importDefault(require("is-electron-renderer"));
const electron_1 = require("electron");
function createConfig(type, name, values) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!is_electron_renderer_1.default)
            return yield Setting_1.default.create({ type, name, values }).catch((e) => {
                error: e;
            });
        return electron_1.ipcRenderer.invoke('configurator-create', { type, name, values });
    });
}
exports.createConfig = createConfig;
