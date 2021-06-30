/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-27 10:08:37 pm
 * @copyright TechnomancyIT
 */

console.log(' I AM WALL PAPER', 'ROARK');

import WallpaperPage from './pages/main';

import { sequelize, addModels } from '../../src/libs/database';

// import Library from './models/Library';

console.log(sequelize.models.Setting);

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

export default WallpaperPage;
