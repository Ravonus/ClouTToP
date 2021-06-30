"use strict";
/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 4:31:45 pm
 * @copyright TechnomancyIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateConfig = exports.deleteConfig = exports.createConfig = exports.getConfig = void 0;
var get_1 = require("./get");
Object.defineProperty(exports, "getConfig", { enumerable: true, get: function () { return get_1.getConfig; } });
var create_1 = require("./create");
Object.defineProperty(exports, "createConfig", { enumerable: true, get: function () { return create_1.createConfig; } });
var delete_1 = require("./delete");
Object.defineProperty(exports, "deleteConfig", { enumerable: true, get: function () { return delete_1.deleteConfig; } });
var update_1 = require("./update");
Object.defineProperty(exports, "updateConfig", { enumerable: true, get: function () { return update_1.updateConfig; } });
