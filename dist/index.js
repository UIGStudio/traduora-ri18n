"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRI18n = exports.setRI18nLocale = void 0;
const i18n_js_1 = __importDefault(require("i18n-js"));
const pluralizers_1 = __importDefault(require("./pluralizers"));
const utils_1 = require("./utils");
const setRI18nLocale = (locale) => {
    i18n_js_1.default.locale = locale;
    localStorage.setItem('lang', locale);
};
exports.setRI18nLocale = setRI18nLocale;
const initRI18n = ({ localesUrl, defaultLocale, availableLocales, defaultTranslations = {}, pluralizers = {} }) => {
    i18n_js_1.default.locale = utils_1.getInitLocale(availableLocales, defaultLocale);
    i18n_js_1.default.defaultLocale = defaultLocale;
    i18n_js_1.default.pluralization = { ...pluralizers_1.default, ...pluralizers };
    i18n_js_1.default.fallbacks = true;
    i18n_js_1.default.translations = defaultTranslations;
    availableLocales.forEach(l => utils_1.loadLocale(localesUrl, l));
};
exports.initRI18n = initRI18n;
const RI18n = i18n_js_1.default;
exports.default = RI18n;
//# sourceMappingURL=index.js.map