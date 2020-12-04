import DataStorage from "../interfaces/DataStorage";
export declare type ConfigInternalType = {
    url: string;
    projectId: string;
    locale: string;
    clientId: string;
    clientSecret: string;
    cacheTtl: number;
};
declare type ConfigType = Omit<ConfigInternalType, 'cacheTtl'> & {
    cacheProvider?: DataStorage;
    cacheTtl?: number;
};
export default class Manager {
    private config;
    private storage;
    private fetcher;
    constructor(config: ConfigType);
    createConfig: ({ cacheProvider, cacheTtl, ...props }: ConfigType) => {
        cacheTtl: number;
        url: string;
        projectId: string;
        locale: string;
        clientId: string;
        clientSecret: string;
    };
    getConfig: () => ConfigInternalType;
    init: () => Promise<object | undefined>;
    changeLocale: (locale: string) => Promise<object | undefined>;
    private checkTokenData;
    private fetchTranslate;
}
export {};
