import DataStorage from "../interfaces/DataStorage";
import BaseStorage from "./BaseStorage";
export default class CacheStorage extends BaseStorage implements DataStorage {
    private cacheProvider;
    constructor(cacheProvider: DataStorage, ttl: number);
    getItem: <T>(key: string) => Promise<T | undefined>;
    setItem: (key: string, value: object | string | number) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
}
