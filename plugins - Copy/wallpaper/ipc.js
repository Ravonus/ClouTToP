"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-30 1:27:13 am
 * @copyright TechnomancyIT
 */
const node_ipc_1 = __importDefault(require("node-ipc"));
node_ipc_1.default.config.id = 'hello';
node_ipc_1.default.config.retry = 1500;
node_ipc_1.default.config.maxRetries = 100;
exports.default = (ee, opts) => {
    return new Promise((resolve, reject) => {
        node_ipc_1.default.connectTo('Clout', function () {
            node_ipc_1.default.of.Clout.on('connect', function () {
                node_ipc_1.default.log('## connected to Clout ##', opts.models);
                node_ipc_1.default.of.Clout.emit('api', //any event or message type your server listens for
                opts.models);
            });
            node_ipc_1.default.of.Clout.on('disconnect', function () {
                node_ipc_1.default.log('disconnected from Clout');
            });
            node_ipc_1.default.of.Clout.on('api', //any event or message type your server listens for
            function (data) {
                resolve(data);
                ee.emit('api', data);
                // ipc.log('got a message from Clout : ', data);
            });
        });
    });
};
