import I18n from 'i18n-js';

import defaultPluralizers from './pluralizers';
import {getInitLocale, loadLocale} from './utils';

const RI18n = I18n;

const setRI18nLocale = (locale: string) => {
    RI18n.locale = locale;
    localStorage.setItem('lang', locale);
};

export type  RI18nConfig = {
    localesUrl: string;
    defaultLocale: string;
    availableLocales: string[];
    defaultTranslations?: { [key: string]: object }
    pluralizers?: { [key: string]: object }
}

const initRI18n = ({
   localesUrl,
   defaultLocale,
   availableLocales,
   defaultTranslations = {},
   pluralizers = {}
}: RI18nConfig) => {
    RI18n.locale = getInitLocale(availableLocales, defaultLocale);
    RI18n.defaultLocale = defaultLocale;
    RI18n.pluralization = {...defaultPluralizers, ...pluralizers};
    RI18n.fallbacks = true;
    RI18n.translations = defaultTranslations;
    availableLocales.forEach(l => loadLocale(RI18n, localesUrl, l));
}

export {
    setRI18nLocale,
    initRI18n,
}

export default RI18n;
