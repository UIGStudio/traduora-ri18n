import I18n from "i18n-js";

export const loadLocale = (ri18n: typeof I18n, localesUrl: string, locale: string) => {
    fetch(`${localesUrl}${locale}.json`)
        .then((res) => res.json())
        .then((json) => {
            ri18n.translations = {...ri18n.translations, [locale]: json};
        });
};

export const getInitLocale = (availableLocales: string[], defaultValue = 'en') => {
    return (
        [
            localStorage.getItem('lang'),
            navigator.language,
            ...navigator.languages,
        ].find((l) => l && availableLocales.includes(l)) || defaultValue
    );
};
