/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 11:57:47 pm
 * @copyright TechnomancyIT
 */
import ipc from 'node-ipc';
import Plugin from '../models/Plugin';

// import { Plugin } from './database';

import { addModels, sequelize } from './database';

ipc.config.id = 'Clout';
ipc.config.retry = 1500;

ipc.config.silent = true;

ipc.serve(function () {
  ipc.server.on('api', async function (data, socket) {
    let doc;

    if (data.type === 'registration') {
      console.log('REGISTRATION', data, ipc.config.id);
      const plugin = await Plugin.findOne({ where: { ipcId: data.id } });

      console.log('IT S HERE', plugin);
    }

    if (data.type === 'addModel') await addModels([data.models]);

    if (data.type === 'database') {
      const model: any = sequelize.models[data.table];

      doc = await model[data.method](data.values).catch((e: any) => {});
    }

    serverEmit(socket, { doc, type: data.type, emitterId: data.emitterId });
  });
  ipc.server.on('socket.disconnected', function (socket, destroyedSocketID) {
    ipc.log('client ' + destroyedSocketID + ' has disconnected!');
  });
});

ipc.server.start();

function serverEmit(socket: any, data: any) {
  ipc.server.emit(socket, 'api', data);
}

export default ipc;
