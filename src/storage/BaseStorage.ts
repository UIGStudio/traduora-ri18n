import Keys from "../services/Keys";


export type TokenDataType = {
    accessToken: string;
    expiresIn: string;
    tokenType: string;
}
export type LocaleDataType = {
    updatedAt: number;
    data: object;
}

export type LocalesDataType = {
    [language: string]: LocaleDataType;
}

export default class BaseStorage {
    private ttl: number;

    constructor(ttl: number) {
        this.ttl = ttl;
    }

    getItem = async <T>(_key: string): Promise<T | undefined> => {
        throw new Error('implement getItem() function');
    };

    setItem = async (_key: string, _value: object | string | number): Promise<void> => {
        throw new Error('implement setItem() function');
    };

    getTokenData = async (): Promise<TokenDataType | undefined> => {
        try {
            const authData: TokenDataType | undefined = await this.getItem<TokenDataType>(Keys.Auth);
            if (authData && authData.expiresIn && new Date().getTime() < new Date(authData.expiresIn).getTime()) {
                return authData;
            }
            return undefined;
        } catch (e) {
            return undefined;
        }
    }

    setTokenData = async (tokenData: TokenDataType) => {
        return await this.setItem(Keys.Auth, tokenData);
    }


    getLocales = async (): Promise<LocalesDataType> => {
        const authData: LocalesDataType | undefined = await this.getItem(Keys.Data);
        return authData || {};

    }

    isValidLocale = (locale: LocaleDataType) => {
        const expireAt = new Date(locale.updatedAt);
        expireAt.setDate(expireAt.getDate() + this.ttl);
        return new Date().getTime() < expireAt.getTime()
    }

    getLocale = async (locale: string): Promise<object | undefined> => {
        const locales = await this.getLocales();
        if (Object.prototype.hasOwnProperty.call(locales, locale)) {
            return this.isValidLocale(locales[locale]) ? locales[locale] : undefined
        }
        return undefined;
    }

    setLocale = async (locale: string, value: object): Promise<void> => {
        const locales = this.getLocales();
        await this.setItem(Keys.Data, JSON.stringify({
            ...locales,
            [locale]: {
                updatedAt: new Date().getTime(),
                data: value,
            }
        }))
    }

}

