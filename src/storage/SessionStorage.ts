import DataStorage from "../interfaces/DataStorage";
import BaseStorage from "./BaseStorage";


type Storage = {
    [key: string]: any;
}

export default class SessionStorage extends BaseStorage implements DataStorage {
    private storage: Storage = {
        auth: undefined,
        locales: {}
    }

    getItem = async <T>(key: string): Promise<T | undefined> => {
        return new Promise(resolve => {
            resolve(Object.prototype.hasOwnProperty.call(this.storage, key) ? this.storage[key] : undefined)
        })
    };

    setItem = async (key: string, value: object | string | number): Promise<void> => {
        return new Promise(resolve => {
            this.storage = {...this.storage, [key]: value};
            resolve()
        })
    };

    removeItem = async (key: string): Promise<void> => {
        return new Promise(resolve => {
            if (Object.prototype.hasOwnProperty.call(this.storage, key)) {
                delete this.storage[key]
            }
            resolve()
        })
    };


}

