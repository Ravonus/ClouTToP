var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * @author Chad Koslovsky
 * @email Chad@technomancy.it
 * @create date 2021-05-25 00:12:45
 * @modify date 2021-05-29 05:05:22
 * @desc [ Plugin sqlite3 model. This extends the Plugin Table into a functional class throughout the application. Just include this file within a script and it will let you know all functionality you have via the database with this table.
 *        You will see the @Table class has all your Column info inside of it. You can set Hooks and Prototypes on the Acutal Plugin Class or Plugin Instance you pull. The model will always be attached to sequalize.models.
 *        Remeber Database functionality MUST happen in backend process only. ]
 * @return {Model Instance} This return the Plugin Instance. You may Create/Delete/Update/Find Plugins from sqlite3.
 */
import { Table, Column, Model, AllowNull, DataType, Unique, Default, } from 'sequelize-typescript';
let Plugin = class Plugin extends Model {
};
__decorate([
    AllowNull(false),
    Unique(true),
    Column({ type: DataType.STRING }),
    __metadata("design:type", String)
], Plugin.prototype, "name", void 0);
__decorate([
    Unique(true),
    Column({ type: DataType.STRING }),
    __metadata("design:type", String)
], Plugin.prototype, "ipcId", void 0);
__decorate([
    Default(false),
    Column({ type: DataType.BOOLEAN }),
    __metadata("design:type", Boolean)
], Plugin.prototype, "enabled", void 0);
__decorate([
    AllowNull(false),
    Default(true),
    Column({ type: DataType.BOOLEAN }),
    __metadata("design:type", Boolean)
], Plugin.prototype, "firstRun", void 0);
__decorate([
    Default(false),
    Column({ type: DataType.BOOLEAN }),
    __metadata("design:type", Boolean)
], Plugin.prototype, "registered", void 0);
Plugin = __decorate([
    Table({ timestamps: true })
], Plugin);
export default Plugin;
