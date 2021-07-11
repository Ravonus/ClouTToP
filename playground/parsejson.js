//const plugins = {[^\/]+

const jsonparse = require('parse-json');
const fs = require('fs');

const t = `eeekz: require('./eekz.js'),`;

const str = `const plugins = {
  eeek: require('./ipctest.js'),
  test: require('./eek.js'),
};`;

const match = str.match(/{[^;]+/);

let newStr = 'const plugins = ';

if (match) newStr += match[0].replace(/\n.*$/, '');

newStr += `\n  ${t}\n}`;

//console.log(eval(newStr.trim()));
