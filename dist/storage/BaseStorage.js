"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Keys_1 = __importDefault(require("../services/Keys"));
class BaseStorage {
    constructor(ttl) {
        this.getItem = async (_key) => {
            throw new Error('implement getItem() function');
        };
        this.setItem = async (_key, _value) => {
            throw new Error('implement setItem() function');
        };
        this.getTokenData = async () => {
            try {
                const authData = await this.getItem(Keys_1.default.Auth);
                if (authData && authData.expiresIn && new Date().getTime() < new Date(authData.expiresIn).getTime()) {
                    return authData;
                }
                return undefined;
            }
            catch (e) {
                return undefined;
            }
        };
        this.setTokenData = async (tokenData) => {
            return await this.setItem(Keys_1.default.Auth, tokenData);
        };
        this.getLocales = async () => {
            const authData = await this.getItem(Keys_1.default.Data);
            return authData || {};
        };
        this.isValidLocale = (locale) => {
            const expireAt = new Date(locale.updatedAt);
            expireAt.setDate(expireAt.getDate() + this.ttl);
            return new Date().getTime() < expireAt.getTime();
        };
        this.getLocale = async (locale) => {
            const locales = await this.getLocales();
            if (Object.prototype.hasOwnProperty.call(locales, locale)) {
                return this.isValidLocale(locales[locale]) ? locales[locale] : undefined;
            }
            return undefined;
        };
        this.setLocale = async (locale, value) => {
            const locales = this.getLocales();
            await this.setItem(Keys_1.default.Data, JSON.stringify({
                ...locales,
                [locale]: {
                    updatedAt: new Date().getTime(),
                    data: value,
                }
            }));
        };
        this.ttl = ttl;
    }
}
exports.default = BaseStorage;
//# sourceMappingURL=BaseStorage.js.map