import DataStorage from "./interfaces/DataStorage";
import Manager from "./services/Manager";

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

class Traduora {
    private manager: Manager | undefined;
    init = async (config: ConfigType) => {
        this.manager = new Manager(config);
        return this.manager.init();
    }

    setLanguage = (locale: string) => {
        if (!this.manager) {
            throw Error('traduora is not initialized');
        }
        return this.manager.changeLocale(locale);
    }

}

const traduora = new Traduora();

export default traduora;
