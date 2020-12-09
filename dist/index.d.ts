import I18n from 'i18n-js';
declare const setRI18nLocale: (locale: string) => void;
export declare type RI18nConfig = {
    localesUrl: string;
    defaultLocale: string;
    availableLocales: string[];
    defaultTranslations?: {
        [key: string]: object;
    };
    pluralizers?: {
        [key: string]: object;
    };
};
declare const initRI18n: ({ localesUrl, defaultLocale, availableLocales, defaultTranslations, pluralizers }: RI18nConfig) => void;
declare const RI18n: typeof I18n;
export { setRI18nLocale, initRI18n, };
export default RI18n;
