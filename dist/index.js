"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Manager_1 = __importDefault(require("./services/Manager"));
class Traduora {
    constructor() {
        this.init = async (config) => {
            this.manager = new Manager_1.default(config);
            return this.manager.init();
        };
        this.setLanguage = (locale) => {
            if (!this.manager) {
                throw Error('traduora is not initialized');
            }
            return this.manager.changeLocale(locale);
        };
    }
}
const traduora = new Traduora();
exports.default = traduora;
//# sourceMappingURL=index.js.map