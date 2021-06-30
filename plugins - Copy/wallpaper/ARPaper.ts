/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-27 10:08:37 pm
 * @copyright TechnomancyIT
 */

import WallpaperPage from './pages/main';
import EventEmitter from 'events';
import Library from './models/Library';

import fs from 'fs';
import ipc from './ipc';

const ee = new EventEmitter();

(async () => {
  const libraryString = fs.readFileSync(
    `${__dirname}/models/Library.ts`,
    'utf-8'
  );

  await ipc(ee, { models: [libraryString], type: 'addModels' });

  ee.on('api', function (text) {
    console.log('eekah', text);
  });

  const created = await Library.create({
    type: 'html5',
    path: 'http://html5.com',
    title: 'My Html5 video',
    description: 'This is the video',
  }).catch((e) => {
    console.log(e);
  });
  const libList = await Library.findAll();
  console.log(libList);
})();

export default WallpaperPage;
