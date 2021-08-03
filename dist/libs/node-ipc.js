var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ipc from 'node-ipc';
import Plugin from '../models/Plugin';
// import { Plugin } from './database';
import { addModels, sequelize } from './database';
ipc.config.id = 'Clout';
ipc.config.retry = 1500;
ipc.config.silent = true;
ipc.serve(function () {
    ipc.server.on('api', function (data, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            let doc;
            if (data.type === 'registration') {
                const plugin = yield Plugin.findOne({ where: { ipcId: data.id } });
                if (plugin) {
                    doc = { registered: true, id: plugin.ipcId, firstRun: plugin.firstRun };
                    plugin.firstRun = false;
                    plugin.registered = true;
                    plugin.save();
                }
                else
                    doc = { registered: false };
            }
            else {
                console.log(socket.id);
                const application = yield Plugin.findOne({
                    where: { ipcId: socket.id },
                });
                if (!application)
                    return serverEmit(socket, { error: 'IPC App ID mismatch.' });
            }
            if (data.type === 'addModel') {
                yield addModels(data.models);
            }
            if (data.type === 'relationships') {
                data.relationships.map((relationship) => {
                    const model = global.models[relationship.model];
                    const relationshipModel = global.models[relationship.relationshipModel];
                    console.log(Object.keys(Plugin), Object.keys(global.models.Library));
                    // relationshipModel.belongsTo(
                    //   () => {
                    //     return model;
                    //   },
                    //   { foreignKey: 'sceneId' }
                    // );
                    sequelize.models.Setting.hasOne(sequelize.models.Library, {
                        foreignKey: 'libraryId',
                    });
                    // (global as any).models.Plugin.hasOne(
                    //   Object.keys((global as any).models.Setting),
                    //   {
                    //     foreignKey: 'settingId',
                    //     as: 'settings',
                    //   }
                    // );
                    // model[relationship.type](relationshipModel, relationship.opts);
                });
            }
            if (data.type === 'database') {
                const model = sequelize.models[data.table];
                doc = yield model[data.method](data.values).catch((e) => {
                    console.log(e);
                });
            }
            serverEmit(socket, { doc, type: data.type, emitterId: data.emitterId });
        });
    });
    ipc.server.on('socket.disconnected', function (socket, destroyedSocketID) {
        ipc.log('client ' + destroyedSocketID + ' has disconnected!');
    });
});
ipc.server.start();
function serverEmit(socket, data) {
    ipc.server.emit(socket, 'api', data);
}
export default ipc;
