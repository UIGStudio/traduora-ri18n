import I18n from "i18n-js";

export const loadLocale = (localesUrl: string, locale: string) => {
    fetch(`${localesUrl}${locale}.json`)
        .then((res) => res.json())
        .then((json) => {
            I18n.translations = {...I18n.translate, [locale]: json};
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
