"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitLocale = exports.loadLocale = void 0;
exports.loadLocale = (ri18n, localesUrl, locale) => {
    fetch(`${localesUrl}${locale}.json`)
        .then((res) => res.json())
        .then((json) => {
        ri18n.translations = { ...ri18n.translations, [locale]: json };
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