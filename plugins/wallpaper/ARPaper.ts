/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-27 10:08:37 pm
 * @copyright TechnomancyIT
 */

import WallpaperPage from './pages/main';

import { sequelize, addModels } from '../../src/libs/database';

import Library from './models/Library';
import Setting from '../../src/models/Setting';

(async () => {
  // await addModels([Library]);

  console.log(Setting);

  // const created = await Library.create({
  //   type: 'html5',
  //   path: 'http://html5.com',
  //   title: 'My Html5 video',
  //   description: 'This is the video',
  // }).catch((e) => {
  //   console.log(e);
  // });

  // const libList = await Library.findAll();

  // console.log(libList);
})();

export default WallpaperPage;
