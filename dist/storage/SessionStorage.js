"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseStorage_1 = __importDefault(require("./BaseStorage"));
class SessionStorage extends BaseStorage_1.default {
    constructor() {
        super(...arguments);
        this.storage = {
            auth: undefined,
            locales: {}
        };
        this.getItem = async (key) => {
            return new Promise(resolve => {
                resolve(Object.prototype.hasOwnProperty.call(this.storage, key) ? this.storage[key] : undefined);
            });
        };
        this.setItem = async (key, value) => {
            return new Promise(resolve => {
                this.storage = { ...this.storage, [key]: value };
                resolve();
            });
        };
        this.removeItem = async (key) => {
            return new Promise(resolve => {
                if (Object.prototype.hasOwnProperty.call(this.storage, key)) {
                    delete this.storage[key];
                }
                resolve();
            });
        };
    }
}
exports.default = SessionStorage;
//# sourceMappingURL=SessionStorage.js.map