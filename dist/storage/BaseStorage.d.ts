export declare type TokenDataType = {
    accessToken: string;
    expiresIn: string;
    tokenType: string;
};
export declare type LocaleDataType = {
    updatedAt: number;
    data: object;
};
export declare type LocalesDataType = {
    [language: string]: LocaleDataType;
};
export default class BaseStorage {
    private ttl;
    constructor(ttl: number);
    getItem: <T>(_key: string) => Promise<T | undefined>;
    setItem: (_key: string, _value: object | string | number) => Promise<void>;
    getTokenData: () => Promise<TokenDataType | undefined>;
    setTokenData: (tokenData: TokenDataType) => Promise<void>;
    getLocales: () => Promise<LocalesDataType>;
    isValidLocale: (locale: LocaleDataType) => boolean;
    getLocale: (locale: string) => Promise<object | undefined>;
    setLocale: (locale: string, value: object) => Promise<void>;
}
