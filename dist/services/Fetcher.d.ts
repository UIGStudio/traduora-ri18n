import { ConfigInternalType } from "../index";
export declare type TokenDataType = {
    accessToken: string;
    expiresIn: string;
    tokenType: string;
};
export default class Fetcher {
    private config;
    constructor(config: ConfigInternalType);
    login: () => Promise<TokenDataType>;
    fetchLocale: (locale: string, token: string) => Promise<any>;
    private projectUrl;
    private authUrl;
}
