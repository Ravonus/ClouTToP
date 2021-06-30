/**
 * @author Chad Koslovsky <chad@technomnancy.it>
 * @file Description
 * @desc Created on 2021-06-30 1:27:13 am
 * @copyright TechnomancyIT
 */
import ipc from 'node-ipc';
import EventEmitter from 'events';

ipc.config.id = 'hello';
ipc.config.retry = 1500;
ipc.config.maxRetries = 100;

export default (ee: EventEmitter, opts: any) => {
  return new Promise((resolve, reject) => {
    ipc.connectTo('Clout', function () {
      ipc.of.Clout.on('connect', function () {
        ipc.of.Clout.emit('api', { models: opts.models, type: 'addModel' });
      });
      ipc.of.Clout.on('disconnect', function () {
        ipc.log('disconnected from Clout');
      });
      ipc.of.Clout.on(
        'api', //any event or message type your server listens for
        function (data: any) {
          resolve({ data, ipc });
          ee.emit('api', data);
          // ipc.log('got a message from Clout : ', data);
        }
      );
    });
  });
};

export function getIpc() {
  return ipc;
}
