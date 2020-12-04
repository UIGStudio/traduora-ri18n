import {ConfigInternalType} from "../index";


export type TokenDataType = {
    accessToken: string;
    expiresIn: string;
    tokenType: string;
}


export default class Fetcher {
    private config: ConfigInternalType;

    constructor(config: ConfigInternalType) {
        this.config = config;
    }

    login = async (): Promise<TokenDataType> => {
        const response = await fetch(this.authUrl(), {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "grant_type": "client_credentials",
                "client_id": this.config.clientId,
                "client_secret": this.config.clientSecret
            })
        });
        const data = await response.json();
        if (data) {
            return {
                accessToken: data.access_token,
                expiresIn: data.expires_in,
                tokenType: data.token_type,
            }
        }
        throw Error(`Cannot login: ${response.statusText}`)
    }

    fetchLocale = async (locale: string, token: string): Promise<any> => {
        console.log(this.projectUrl(locale));
        const response = await fetch(this.projectUrl(locale), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/octet-stream',
                'Authorization': `Bearer ${token}`
            },
        })
        return await response.json();
    }

    private projectUrl = (locale: string) => {
        return `${this.config.url}projects/${this.config.projectId}/exports?locale=${locale}&format=jsonnested`
    }

    private authUrl = () => {
        return `${this.config.url}auth/token`
    }
}

