import I18n from 'i18n-js';

import defaultPluralizers from './pluralizers';
import {getInitLocale, loadLocale} from './utils';


const setRI18nLocale = (locale: string) => {
    I18n.locale = locale;
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
    I18n.locale = getInitLocale(availableLocales, defaultLocale);
    I18n.defaultLocale = defaultLocale;
    I18n.pluralization = {...defaultPluralizers, ...pluralizers};
    I18n.fallbacks = true;
    I18n.translations = defaultTranslations;
    availableLocales.forEach(l => loadLocale(localesUrl, l));
}


const RI18n = I18n;

export {
    setRI18nLocale,
    initRI18n,
}


export default RI18n;
