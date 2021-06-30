const ipc = require('node-ipc');

ipc.config.id = 'hello';
ipc.config.retry = 1500;

ipc.connectTo('Clout', function () {
  ipc.of.Clout.on('connect', function () {
    ipc.log('## connected to Clout ##');
    ipc.of.Clout.emit(
      'api', //any event or message type your server listens for
      'hello'
    );
  });
  ipc.of.Clout.on('disconnect', function () {
    ipc.log('disconnected from Clout');
  });
  ipc.of.Clout.on(
    'api', //any event or message type your server listens for
    function (data) {
      ipc.log('got a message from Clout : ', data);
    }
  );
});
