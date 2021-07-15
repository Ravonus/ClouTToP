/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 11:57:47 pm
 * @copyright TechnomancyIT
 */
import { nanoid } from 'nanoid';
import ipc from 'node-ipc';
import Plugin from '../models/Plugin';
import path from 'path';

// import { Plugin } from './database';

import { addModels, sequelize } from './database';

ipc.config.id = 'Clout';
ipc.config.retry = 1500;

ipc.config.silent = true;

ipc.serve(function () {
  ipc.server.on('api', async function (data, socket) {
    let doc;

    if (data.type === 'registration') {
      const plugin = await Plugin.findOne({ where: { ipcId: data.id } });

      if (plugin) {
        doc = { registered: true, id: plugin.ipcId, firstRun: plugin.firstRun };

        plugin.firstRun = false;
        plugin.registered = true;

        plugin.save();
      } else doc = { registered: false };
    } else {
      console.log(socket.id);
      const application = await Plugin.findOne({
        where: { ipcId: socket.id },
      });

      console.log('APPLICATION', application, ipc.config.id);

      if (!application)
        return serverEmit(socket, { error: 'IPC App ID mismatch.' });
    }

    if (data.type === 'addModel') await addModels([path.resolve(data.models)]);

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
