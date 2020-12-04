export default interface DataStorage {
    getItem(key: string): Promise<string | undefined>;

    setItem(key: string, item: string): Promise<void>;

    removeItem(key: string): Promise<void>;
}
