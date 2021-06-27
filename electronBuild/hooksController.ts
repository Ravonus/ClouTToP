/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-26 2:12:29 pm
 * @copyright TechnomancyIT
 */
// ./hooks.js

//Hooks

const postPackage = require(`${__dirname}/postPackage.ts`);
const generateAssets = require(`${__dirname}/preStart.ts`);

module.exports = {
  postPackage,
  generateAssets,
};
