/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-27 10:08:37 pm
 * @copyright TechnomancyIT
 */

import WallpaperPage from './pages/main';
import EventEmitter from 'events';
import Library, { LibraryAttributes } from './models/Library';

import fs from 'fs';
import path from 'path';
import ipcStart, { getIpc } from './ipc';

const ee = new EventEmitter();

(async () => {
  const libraryString = fs.readFileSync(
    path.join(
      __dirname,
      '../../',
      'plugins',
      'wallpaper/models/',
      'Library.js'
    ),
    'utf-8'
  );

  await ipcStart(ee, {
    models: path.join(
      __dirname,
      '../../',
      'plugins',
      'wallpaper/models/',
      'Library.js'
    ),
    type: 'addModels',
  });

  const ipc = getIpc();

  ipc.of.Clout.emit('api', {
    values: {
      type: 'html5',
      path: 'http://html5.com',
      title: 'My Html5 video',
      description: 'This is the video',
    },
    table: 'Library',
    method: 'create',
    type: 'database',
  });

  ee.on('api', function (text) {
    console.log('eekah', text);
  });

  console.log('START CREATIONS');

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
