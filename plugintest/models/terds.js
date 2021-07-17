"use strict";
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-28 12:24:27 am
 * @copyright TechnomancyIT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//TODO: I need to make a system that actually generates this file based on plugins that are turned on. (This way typescript can access the files correctly) - Once this is done an API way to grab each of these files as well so you can access them from eachother.
const main_1 = __importDefault(require("../pages/main"));
const plugins = {
    WallpaperPage: main_1.default,
};
exports.default = plugins;
//export default {};
