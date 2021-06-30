/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-29 11:57:47 pm
 * @copyright TechnomancyIT
 */
import ipc from 'node-ipc';
import Setting from '../models/Setting';

import { addModels, sequelize } from './database';

ipc.config.id = 'Clout';
ipc.config.retry = 1500;

console.log('ITS A GOING');

ipc.serve(function () {
  ipc.server.on('api', async function (data, socket) {
    console.log('MY DATA', data);
    let doc;
    if (data.type === 'addModel') await addModels([data.models]);

    if (data.type === 'database') {
      const model: any = sequelize.models[data.table];
      console.log('model', model);

      doc = await model[data.method](data.values).catch((e: any) => {
        console.log('WTFD', e);
      });
    }

    serverEmit(socket, { doc, type: data.type });
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
