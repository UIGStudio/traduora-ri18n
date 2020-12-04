"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseStorage_1 = __importDefault(require("./BaseStorage"));
class CacheStorage extends BaseStorage_1.default {
    constructor(cacheProvider, ttl) {
        super(ttl);
        this.getItem = async (key) => {
            try {
                const dataString = await this.cacheProvider.getItem(key);
                if (dataString) {
                    const data = JSON.parse(dataString);
                    return data || undefined;
                }
                return undefined;
            }
            catch (e) {
                return undefined;
            }
        };
        this.setItem = async (key, value) => {
            await this.cacheProvider.setItem(key, JSON.stringify(value));
        };
        this.removeItem = async (key) => {
            await this.cacheProvider.removeItem(key);
        };
        this.cacheProvider = cacheProvider;
    }
}
exports.default = CacheStorage;
//# sourceMappingURL=CacheStorage.js.map