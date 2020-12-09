"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitLocale = exports.loadLocale = void 0;
const i18n_js_1 = __importDefault(require("i18n-js"));
exports.loadLocale = (localesUrl, locale) => {
    fetch(`${localesUrl}${locale}.json`)
        .then((res) => res.json())
        .then((json) => {
        i18n_js_1.default.translations = { ...i18n_js_1.default.translate, [locale]: json };
    });
};
exports.getInitLocale = (availableLocales, defaultValue = 'en') => {
    return ([
        localStorage.getItem('lang'),
        navigator.language,
        ...navigator.languages,
    ].find((l) => l && availableLocales.includes(l)) || defaultValue);
};
//# sourceMappingURL=utils.js.map