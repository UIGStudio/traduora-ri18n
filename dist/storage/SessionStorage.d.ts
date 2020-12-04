import DataStorage from "../interfaces/DataStorage";
import BaseStorage from "./BaseStorage";
export default class SessionStorage extends BaseStorage implements DataStorage {
    private storage;
    getItem: <T>(key: string) => Promise<T | undefined>;
    setItem: (key: string, value: object | string | number) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
}
