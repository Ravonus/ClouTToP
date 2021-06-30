"use strict";
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-27 10:08:37 pm
 * @copyright TechnomancyIT
 */
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
const main_1 = __importDefault(require("./pages/main"));
const events_1 = __importDefault(require("events"));
const Library_1 = __importDefault(require("./models/Library"));
const fs_1 = __importDefault(require("fs"));
const ipc_1 = __importDefault(require("./ipc"));
const ee = new events_1.default();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const libraryString = fs_1.default.readFileSync(`${__dirname}/models/Library.ts`, 'utf-8');
    yield ipc_1.default(ee, { models: [libraryString], type: 'addModels' });
    ee.on('api', function (text) {
        console.log('eekah', text);
    });
    const created = yield Library_1.default.create({
        type: 'html5',
        path: 'http://html5.com',
        title: 'My Html5 video',
        description: 'This is the video',
    }).catch((e) => {
        console.log(e);
    });
    const libList = yield Library_1.default.findAll();
    console.log(libList);
}))();
exports.default = main_1.default;
