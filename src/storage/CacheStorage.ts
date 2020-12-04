import DataStorage from "../interfaces/DataStorage";
import BaseStorage from "./BaseStorage";


export default class CacheStorage extends BaseStorage implements DataStorage {
    private cacheProvider: DataStorage;

    constructor(cacheProvider: DataStorage, ttl: number) {
        super(ttl);
        this.cacheProvider = cacheProvider;
    }

    getItem = async <T>(key: string): Promise<T | undefined> => {
        try {
            const dataString = await this.cacheProvider.getItem(key);
            if (dataString) {
                const data: T | undefined = JSON.parse(dataString);
                return data || undefined;
            }
            return undefined;
        } catch (e) {
            return undefined;
        }
    };

    setItem = async (key: string, value: object | string | number): Promise<void> => {
        await this.cacheProvider.setItem(key, JSON.stringify(value))
    };

    removeItem = async (key: string): Promise<void> => {
        await this.cacheProvider.removeItem(key)
    };


}

