"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRI18n = exports.setRI18nLocale = void 0;
const i18n_js_1 = __importDefault(require("i18n-js"));
const pluralizers_1 = __importDefault(require("./pluralizers"));
const utils_1 = require("./utils");
const RI18n = i18n_js_1.default;
const setRI18nLocale = (locale) => {
    RI18n.locale = locale;
    localStorage.setItem('lang', locale);
};
exports.setRI18nLocale = setRI18nLocale;
const initRI18n = ({ localesUrl, defaultLocale, availableLocales, defaultTranslations = {}, pluralizers = {} }) => {
    RI18n.locale = utils_1.getInitLocale(availableLocales, defaultLocale);
    RI18n.defaultLocale = defaultLocale;
    RI18n.pluralization = { ...pluralizers_1.default, ...pluralizers };
    RI18n.fallbacks = true;
    RI18n.translations = defaultTranslations;
    availableLocales.forEach(l => utils_1.loadLocale(RI18n, localesUrl, l));
};
exports.initRI18n = initRI18n;
exports.default = RI18n;
//# sourceMappingURL=index.js.map