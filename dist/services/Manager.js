"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CacheStorage_1 = __importDefault(require("../storage/CacheStorage"));
const SessionStorage_1 = __importDefault(require("../storage/SessionStorage"));
const Fetcher_1 = __importDefault(require("./Fetcher"));
class Manager {
    constructor(config) {
        this.createConfig = ({ cacheProvider, cacheTtl, ...props }) => {
            return {
                ...props,
                cacheTtl: cacheTtl || 7
            };
        };
        this.getConfig = () => {
            return this.config;
        };
        this.init = async () => {
            return await this.fetchTranslate();
        };
        this.changeLocale = async (locale) => {
            this.config.locale = locale;
            return await this.fetchTranslate();
        };
        this.checkTokenData = async () => {
            let tokenData = await this.storage.getTokenData();
            if (!tokenData) {
                tokenData = await this.fetcher.login();
                await this.storage.setTokenData(tokenData);
            }
            return tokenData;
        };
        this.fetchTranslate = async () => {
            let locale = await this.storage.getLocale(this.config.locale);
            if (!locale) {
                const token = await this.checkTokenData();
                locale = await this.fetcher.fetchLocale(this.config.locale, token.accessToken);
                console.log(locale);
                await this.storage.setLocale(this.config.locale, locale || {});
            }
            return locale;
        };
        this.config = this.createConfig(config);
        this.fetcher = new Fetcher_1.default(this.config);
        if (config.cacheProvider) {
            this.storage = new CacheStorage_1.default(config.cacheProvider, this.config.cacheTtl);
        }
        else {
            this.storage = new SessionStorage_1.default(this.config.cacheTtl);
        }
    }
}
exports.default = Manager;
//# sourceMappingURL=Manager.js.map