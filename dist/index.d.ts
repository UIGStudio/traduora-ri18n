import DataStorage from "./interfaces/DataStorage";
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
declare class Traduora {
    private manager;
    init: (config: ConfigType) => Promise<object | undefined>;
    setLanguage: (locale: string) => Promise<object | undefined>;
}
declare const traduora: Traduora;
export default traduora;
