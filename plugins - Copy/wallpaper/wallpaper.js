"use strict";
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-27 10:08:37 pm
 * @copyright TechnomancyIT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log(' I AM WALL PAPER', 'ROARK');
const main_1 = __importDefault(require("./pages/main"));
const database_1 = require("../../src/libs/database");
// import Library from './models/Library';
console.log(database_1.sequelize.models.Setting);
// (async () => {
//   await addModels([Library]);
//   const created = await Library.create({
//     type: 'html5',
//     path: 'http://html5.com',
//     title: 'My Html5 video',
//     description: 'This is the video',
//   }).catch((e) => {
//     console.log(e);
//   });
// })();
console.log(' I AM WALL PAPER');
exports.default = main_1.default;
