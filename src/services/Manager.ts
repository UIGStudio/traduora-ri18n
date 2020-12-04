import DataStorage from "../interfaces/DataStorage";
import BaseStorage from "../storage/BaseStorage";
import CacheStorage from "../storage/CacheStorage";
import SessionStorage from "../storage/SessionStorage";
import Fetcher from "./Fetcher";

export type ConfigInternalType = {
    url: string;
    projectId: string;
    locale: string;
    clientId: string;
    clientSecret: string;
    cacheTtl: number;
}
type ConfigType = Omit<ConfigInternalType, 'cacheTtl'> & {
    cacheProvider?: DataStorage;
    cacheTtl?: number;
}

export default class Manager {
    private config: ConfigInternalType;
    private storage: BaseStorage;
    private fetcher: Fetcher;

    constructor(config: ConfigType) {
        this.config = this.createConfig(config)
        this.fetcher = new Fetcher(this.config);

        if (config.cacheProvider) {
            this.storage = new CacheStorage(config.cacheProvider, this.config.cacheTtl);
        } else {
            this.storage = new SessionStorage(this.config.cacheTtl);
        }
    }

    createConfig = ({cacheProvider, cacheTtl, ...props}: ConfigType) => {
        return {
            ...props,
            cacheTtl: cacheTtl || 7
        }
    }

    getConfig = () => {
        return this.config;
    }

    init = async () => {
        return await this.fetchTranslate();
    }

    changeLocale = async (locale: string) => {
        this.config.locale = locale;
        return await this.fetchTranslate();
    }

    private checkTokenData = async () => {
        let tokenData = await this.storage.getTokenData();

        if (!tokenData) {
            tokenData = await this.fetcher.login();
            await this.storage.setTokenData(tokenData)
        }
        return tokenData;
    }

    private fetchTranslate = async () => {
        let locale = await this.storage.getLocale(this.config.locale);
        if (!locale) {
            const token = await this.checkTokenData();
            locale = await this.fetcher.fetchLocale(this.config.locale, token.accessToken);
            console.log(locale);
            await this.storage.setLocale(this.config.locale, locale || {});
        }
        return locale;
    }

}
